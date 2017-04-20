IMAGE:=nudj/hire
IMAGEDEV:=nudj/hire-dev
DEVURL:=

CWD=$(shell pwd)
BIN:=./node_modules/.bin

.PHONY: build buildDev run dev packClient packServer pack test tdd

build:
	@docker build \
		-t $(IMAGE) \
		--build-arg NPM_TOKEN=${NPM_TOKEN} \
		.

push:
	@docker push $(IMAGE):latest

buildDev:
	@docker build \
		-t $(IMAGEDEV) \
		--build-arg NPM_TOKEN=${NPM_TOKEN} \
		-f $(CWD)/Dockerfile.dev \
		.

cache:
	-@docker rm -f dev-cache 2> /dev/null || true
	@docker run --rm -it \
		--name dev-cache \
		-v $(CWD)/.cache:/usr/src/.cache \
		$(IMAGEDEV) \
		/bin/sh -c 'rm -rf .cache/* && cp -R /tmp/node_modules/. .cache/'

run:
	@docker run -it --rm \
		--name hire \
		-p 0.0.0.0:4000:80 \
		$(IMAGE)
	@echo 'App running on http://localhost:4000/'

dev:
	-@docker rm -f dev-container 2> /dev/null || true
	@echo 'App=http://localhost:90/, Api=http://localhost:91/'
	@docker run --rm -it \
		--name dev-container \
		-p 0.0.0.0:90:80 \
		-p 0.0.0.0:91:81 \
		--add-host api:127.0.0.1 \
		-v $(CWD)/src/lib:/usr/src/lib \
		-v $(CWD)/src/mocks:/usr/src/mocks \
		-v $(CWD)/src/package.json:/usr/src/package.json \
		--env-file $(CWD)/.env \
		$(IMAGEDEV) \
		/bin/sh -c 'ln -s /tmp/node_modules ./node_modules && $(BIN)/nodemon \
			--config ./nodemon.json \
			-e js,html,css \
			--quiet \
			--watch ./ \
			--delay 250ms \
			-x "printf \"\n\nBuilding...\n\" && ./node_modules/.bin/webpack --config ./webpack.client.js --bail --hide-modules && ./node_modules/.bin/webpack --config ./webpack.server.js --bail --hide-modules && node ."'

packClient:
	@docker exec -i dev-container \
		$(BIN)/webpack --config ./src/webpack.client.js --bail --hide-modules

packServer:
	@docker exec -i dev-container \
		$(BIN)/webpack --config ./src/webpack.server.js --bail --hide-modules

pack: packClient packServer

test:
	-@docker rm -f test-container 2> /dev/null || true
	@docker run --rm -it \
		--name test-container \
		-v $(CWD)/src/lib:/usr/src/lib \
		-v $(CWD)/src/test:/usr/src/test \
		$(IMAGEDEV)

tdd:
	-@docker rm -f test-container 2> /dev/null || true
	@docker run --rm -it \
		--name test-container \
		-v $(CWD)/src/lib:/usr/src/lib \
		-v $(CWD)/src/test:/usr/src/test \
		$(IMAGEDEV) \
		/bin/sh -c 'ln -s /tmp/node_modules ./node_modules && $(BIN)/nodemon \
			--quiet \
			--watch ./ \
			--delay 250ms \
			-x "$(BIN)/mocha test/*.js || exit 1"'
