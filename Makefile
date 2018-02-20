APP:=hire
IMAGE:=nudj/$(APP)
IMAGEDEV:=nudj/$(APP)-dev
IMAGEUI:=nudj/$(APP)-ui
CONTAINERTEST:=$(APP)-test
CONTAINERUI:=$(APP)-ui
CWD=$(shell pwd)
COREAPPS:=server api redis db
DOCKERCOMPOSE:=docker-compose -f $(CWD)/../server/local/docker-compose-dev.yml -f $(CWD)/core-override.yml

.PHONY: build buildLocal coreUp coreDown coreLogs up ssh down test

build:
	@./build.sh $(IMAGEDEV)

buildLocal:
	@docker build \
		-t $(IMAGE):local \
		--build-arg NODE_ENV=production \
		--build-arg NPM_TOKEN=${NPM_TOKEN} \
		-f $(CWD)/Dockerfile \
		.

coreUp:
	@$(DOCKERCOMPOSE) up -d --force-recreate --no-deps $(COREAPPS)

coreDown:
	@$(DOCKERCOMPOSE) rm -f -s $(COREAPPS)

coreLogs:
	@$(DOCKERCOMPOSE) logs -f $(COREAPPS)

up:
	@$(DOCKERCOMPOSE) up -d --force-recreate --no-deps $(APP)

ssh:
	@$(DOCKERCOMPOSE) exec $(APP) /bin/zsh

down:
	@$(DOCKERCOMPOSE) rm -f -s $(APP)

test:
	-@docker rm -f $(CONTAINERTEST) 2> /dev/null || true
	@docker run --rm -it \
		--name $(CONTAINERTEST) \
		--env-file $(CWD)/.env \
		-v $(CWD)/src/app:/usr/src/app \
		-v $(CWD)/src/test:/usr/src/test \
		-v $(CWD)/src/.flowconfig:/usr/src/.flowconfig \
		-v $(CWD)/src/.babelrc:/usr/src/.babelrc \
		-v $(CWD)/src/flow-typed:/usr/src/flow-typed \
		-v $(CWD)/src/package.json:/usr/src/package.json \
		$(IMAGEDEV) \
		/bin/sh -c './node_modules/.bin/standard --parser babel-eslint --plugin flowtype \
		  && ./node_modules/.bin/flow --quiet \
		  && ./node_modules/.bin/mocha --compilers js:babel-core/register --recursive test/unit'

ui:
	-@docker rm -f $(CONTAINERUI) 2> /dev/null || true
	@docker run -i --rm \
		--name $(CONTAINERUI) \
		--shm-size=1gb \
		--cap-add=SYS_ADMIN \
		$(IMAGEUI) \
		node -e "`cat ./src/test/ui/index.js`"

uicp:
	@$(DOCKERCOMPOSE) run --rm ui node -e "`cat ./src/test/ui/index.js`"

standardFix:
	-@docker rm -f $(APP)-dev 2> /dev/null || true
	@docker run --rm -it \
		--env-file $(CWD)/.env \
		--name $(APP)-dev \
		-e NPM_TOKEN=${NPM_TOKEN} \
		-v $(CWD)/src/app:/usr/src/app \
		$(IMAGEDEV) \
		/bin/sh -c './node_modules/.bin/standard --fix --parser babel-eslint --plugin flowtype'
