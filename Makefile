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
	-@docker rm -f hire-dev-cache 2> /dev/null || true
	@docker run --rm -it \
		--name hire-dev-cache \
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
	-@docker rm -f hire-dev-container 2> /dev/null || true
	@echo 'App=http://localhost:90/, Api=http://localhost:91/'
	@docker run --rm -it \
		--name hire-dev-container \
		-p 0.0.0.0:90:80 \
		-p 0.0.0.0:91:81 \
		--add-host api:127.0.0.1 \
		-v $(CWD)/src/lib:/usr/src/lib \
		-v $(CWD)/src/mocks:/usr/src/mocks \
		-v $(CWD)/src/package.json:/usr/src/package.json \
		-v $(CWD)/src/webpack.client.js:/usr/src/webpack.client.js \
		-v $(CWD)/src/webpack.dll.js:/usr/src/webpack.dll.js \
		-v $(CWD)/src/webpack.server.js:/usr/src/webpack.server.js \
		-v $(CWD)/src/vendors-manifest.json:/usr/src/vendors-manifest.json \
		--env-file $(CWD)/.env \
		$(IMAGEDEV) \
		/bin/sh -c 'ln -s /tmp/node_modules ./node_modules && $(BIN)/nodemon \
			--config ./nodemon.json \
			-e js,html,css \
			--quiet \
			--watch ./ \
			--delay 250ms \
			-x "printf \"\n\nBuilding...\n\" && ./node_modules/.bin/webpack --config ./webpack.client.js --bail --hide-modules && ./node_modules/.bin/webpack --config ./webpack.server.js --bail --hide-modules && node ."'

stats:
	-@docker rm -f stats-container 2> /dev/null || true
	@docker run --rm -it \
		--name stats-container \
		-v $(CWD)/src/lib:/usr/src/lib \
		-v $(CWD)/src/package.json:/usr/src/package.json \
		-v $(CWD)/src/webpack.client.js:/usr/src/webpack.client.js \
		-v $(CWD)/src/webpack.dll.js:/usr/src/webpack.dll.js \
		-v $(CWD)/src/webpack.server.js:/usr/src/webpack.server.js \
		-v $(CWD)/src/vendors-manifest.json:/usr/src/vendors-manifest.json \
		-v $(CWD)/src/stats.json:/usr/src/stats.json \
		$(IMAGEDEV) \
		/bin/sh -c 'ln -s /tmp/node_modules ./node_modules && ./node_modules/.bin/webpack  --config ./webpack.client.js --profile --json > stats.json'

dll:
	-@docker rm -f dll-container 2> /dev/null || true
	@docker run --rm -it \
		--name dll-container \
		-v $(CWD)/src/lib:/usr/src/lib \
		-v $(CWD)/src/package.json:/usr/src/package.json \
		-v $(CWD)/src/webpack.dll.js:/usr/src/webpack.dll.js \
		-v $(CWD)/src/vendors-manifest.json:/usr/src/vendors-manifest.json \
		-v $(CWD)/src/stats.json:/usr/src/stats.json \
		$(IMAGEDEV) \
		/bin/sh -c 'ln -s /tmp/node_modules ./node_modules && ./node_modules/.bin/webpack  --config ./webpack.dll.js --bail --hide-modules'

packClient:
	@docker exec -i hire-dev-container \
		$(BIN)/webpack --config ./webpack.client.js --bail --hide-modules

packServer:
	@docker exec -i hire-dev-container \
		$(BIN)/webpack --config ./webpack.server.js --bail --hide-modules

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
