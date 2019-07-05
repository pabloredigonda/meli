.PHONY: install up stop setup node mongo logs

MAKEPATH := $(abspath $(lastword $(MAKEFILE_LIST)))
PWD := $(dir $(MAKEPATH))

install:
	docker-compose -f docker-compose.builder.yml run --rm install

build:
	docker-compose -f docker-compose.builder.yml run --rm build

bundles:
	docker-compose -f docker-compose.builder.yml run --rm create-bundles

up:
	docker-compose up -d
stop:
	docker stop meli-node-container
setup:
	docker volume create melinodemodules && docker volume create melimongodata
node:
	docker exec -it meli-node-container bash

worker:
	docker-compose -f docker-compose.builder.yml run --rm worker

mongo:
	docker exec -it meli-mongo-container bash	
logs: 
	docker logs -f meli-node-container