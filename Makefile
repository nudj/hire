IMAGE:=nudj/hire
IMAGEDEV:=nudj/hire-dev
CWD=$(shell pwd)

.PHONY: build ssh test

build:
	@docker build \
		-t $(IMAGEDEV) \
		--build-arg NPM_TOKEN=${NPM_TOKEN} \
		-f $(CWD)/Dockerfile.dev \
		.

ssh:
	-@docker rm -f hire-dev 2> /dev/null || true
	@docker run --rm -it \
		--add-host api:127.0.0.1 \
		--env-file $(CWD)/.env \
		--name hire-dev \
		-e NPM_TOKEN=${NPM_TOKEN} \
		-p 0.0.0.0:90:80 \
		-p 0.0.0.0:91:81 \
		-v $(CWD)/.zshrc:/root/.zshrc \
		-v $(CWD)/src/lib:/usr/src/lib \
		-v $(CWD)/src/mocks:/usr/src/mocks \
		-v $(CWD)/src/test:/usr/src/test \
		-v $(CWD)/src/.npmrc:/usr/src/.npmrc \
		-v $(CWD)/src/nodemon.json:/usr/src/nodemon.json \
		-v $(CWD)/src/package.json:/usr/src/package.json \
		-v $(CWD)/src/webpack.config.js:/usr/src/webpack.config.js \
		-v $(CWD)/src/webpack.dll.js:/usr/src/webpack.dll.js \
		$(IMAGEDEV) \
		/bin/zsh

test:
	-@docker rm -f hire-test 2> /dev/null || true
	@docker run --rm -it \
		--name hire-test \
		-v $(CWD)/src/lib:/usr/src/lib \
		-v $(CWD)/src/mocks:/usr/src/mocks \
		-v $(CWD)/src/test:/usr/src/test \
		$(IMAGEDEV)
