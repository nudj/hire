APP:=hire
IMAGE:=nudj/$(APP)
IMAGEDEV:=nudj/$(APP)-dev
IMAGEUI:=nudj/$(APP)-ui
CWD=$(shell pwd)
COREAPPS:=server api redis db
DOCKERCOMPOSE:=docker-compose -f $(CWD)/../server/local/docker-compose-dev.yml -f $(CWD)/core-override.yml

.PHONY: build buildLocal coreUp coreDown coreLogs up ssh test ui cmd down

build:
	@./build.sh $(IMAGEDEV)
	@docker build -t $(IMAGEUI) -f ./Dockerfile.ui .

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

test:
	@$(DOCKERCOMPOSE) exec $(APP) /bin/sh -c './node_modules/.bin/standard --parser babel-eslint --plugin flowtype \
		&& ./node_modules/.bin/flow --quiet \
		&& ./node_modules/.bin/mocha --compilers js:babel-core/register --recursive test/unit'

ui:
	@$(DOCKERCOMPOSE) run --rm \
		-v $(CWD)/src/test/ui:/usr/src/ui \
		-v $(CWD)/src/test/output:/usr/src/output \
		ui \
		node /usr/src/ui/index.js

cmd:
	@$(DOCKERCOMPOSE) run --force-recreate --rm --no-deps $(APP) wget http://$(APP)/

down:
	@$(DOCKERCOMPOSE) rm -f -s $(APP)

standardFix:
	-@docker rm -f $(APP)-dev 2> /dev/null || true
	@docker run --rm -it \
		--env-file $(CWD)/.env \
		--name $(APP)-dev \
		-e NPM_TOKEN=${NPM_TOKEN} \
		-v $(CWD)/src/app:/usr/src/app \
		$(IMAGEDEV) \
		/bin/sh -c './node_modules/.bin/standard --fix --parser babel-eslint --plugin flowtype'
