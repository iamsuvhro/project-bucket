.PHONY: dev prod prod-logs down logs

dev:
	docker-compose up --build
prod:
	docker-compose -f docker-compose.prod.yml up --build -d
prod-logs:
	docker-compose -f docker-compose.prod.yml logs --follow
down:
	docker-compose down
logs:
	docker-compose logs --follow