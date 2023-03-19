.PHONY: build down logs

build:
	docker-compose up --build
down:
	docker-compose down
logs:
	docker-compose logs --follow