IMAGE:=nudj/hire
IMAGEDEV:=nudj/hire-dev
CWD=$(shell pwd)

.PHONY: build buildLocal ssh test

build:
	@./build.sh $(IMAGEDEV)

buildLocal:
	@docker build \
		-t $(IMAGE):local \
		--build-arg NPM_TOKEN=${NPM_TOKEN} \
		--build-arg NODE_ENV=production \
		-f $(CWD)/Dockerfile \
		.

ssh:
	-@docker rm -f hire-dev 2> /dev/null || true
	@docker run --rm -it \
		--env-file $(CWD)/.env \
		--name hire-dev \
		-e NPM_TOKEN=${NPM_TOKEN} \
		-p 0.0.0.0:90:80 \
		-p 0.0.0.0:91:81 \
		-p 0.0.0.0:92:82 \
		-v $(CWD)/.zshrc:/root/.zshrc \
		-v $(CWD)/src/app:/usr/src/app \
		-v $(CWD)/src/test:/usr/src/test \
		-v $(CWD)/src/.flowconfig:/usr/src/.flowconfig \
		-v $(CWD)/src/.npmrc:/usr/src/.npmrc \
		-v $(CWD)/src/nodemon.json:/usr/src/nodemon.json \
		-v $(CWD)/src/package.json:/usr/src/package.json \
		-v $(CWD)/src/webpack.config.js:/usr/src/webpack.config.js \
		-v $(CWD)/src/webpack.dll.js:/usr/src/webpack.dll.js \
		-v $(CWD)/src/yarn.lock:/usr/src/yarn.lock \
		-v $(CWD)/../framework/src:/usr/src/@nudj/framework \
		-v $(CWD)/../api/src:/usr/src/@nudj/api \
		-v $(CWD)/../library/src:/usr/src/@nudj/library \
		-v $(CWD)/../components/src:/usr/src/@nudj/components \
		$(IMAGEDEV) \
		/bin/zsh

test:
	-@docker rm -f hire-test 2> /dev/null || true
	@docker run --rm -it \
		--env-file $(CWD)/.env \
		--name hire-test \
		-v $(CWD)/src/app:/usr/src/app \
		-v $(CWD)/src/test:/usr/src/test \
		-v $(CWD)/src/flow-typed:/usr/src/flow-typed \
		-v $(CWD)/src/.flowconfig:/usr/src/.flowconfig \
		-v $(CWD)/src/package.json:/usr/src/package.json \
		$(IMAGEDEV) \
		/bin/sh -c './node_modules/.bin/standard --parser babel-eslint --plugin flowtype \
		  && ./node_modules/.bin/flow --quiet \
		  && ./node_modules/.bin/mocha --compilers js:babel-core/register --recursive test'

standardFix:
	-@docker rm -f hire-dev 2> /dev/null || true
	@docker run --rm -it \
		--env-file $(CWD)/.env \
		--name hire-dev \
		-e NPM_TOKEN=${NPM_TOKEN} \
		-v $(CWD)/src/app:/usr/src/app \
		$(IMAGEDEV) \
		/bin/sh -c './node_modules/.bin/standard --fix --parser babel-eslint --plugin flowtype'
