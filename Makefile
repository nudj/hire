APP:=hire
IMAGE:=nudj/$(APP)
IMAGEDEV:=nudj/$(APP):development
CWD=$(shell pwd)
COREAPPS:=server api redis db
DOCKERCOMPOSE:=docker-compose -p nudj

.PHONY: build buildLocal coreUp coreDown coreLogs up ssh ui cmd down test standardFix

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

ui:
	@$(DOCKERCOMPOSE) run --rm \
		-v $(CWD)/src/test/ui:/usr/src/ui \
		-v $(CWD)/src/test/output:/usr/src/output \
		ui \
		node /usr/src/ui/index.js

down:
	@$(DOCKERCOMPOSE) rm -f -s $(APP)

test:
	@$(DOCKERCOMPOSE) exec $(APP) /bin/sh -c './node_modules/.bin/standard \
		&& ./node_modules/.bin/mocha --compilers js:babel-core/register --recursive test/unit'

standardFix:
	-@docker rm -f $(APP)-dev 2> /dev/null || true
	@docker run --rm -it \
		--env-file $(CWD)/.env \
		--name $(APP)-dev \
		-e NPM_TOKEN=${NPM_TOKEN} \
		-v $(CWD)/src/app:/usr/src/app \
		$(IMAGEDEV) \
		/bin/sh -c './node_modules/.bin/standard --fix'
