# Makefile

# Start the app in production mode
up:
	docker-compose up --build -d

# Stop the app
down:
	docker-compose down

# Rebuild only the app container
rebuild:
	docker-compose up --build --no-deps server

# Run the seed script manually
seed:
	docker-compose exec server npm run seed:endpoints

# View logs
logs:
	docker-compose logs -f

# Restart only app
restart:
	docker-compose restart server
