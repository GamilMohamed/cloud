all:
	./startdatabase.sh
	@echo "Starting frontend in a screen session..."
	screen -dmS frontend bash -c 'cd frontend && npm install && npm run dev; exec bash'
	@echo "Starting backend in a screen session..."
	screen -dmS backend bash -c 'cd backend && npm install && npm run dev; exec bash'

db:
	@echo "Starting database in a screen session..."
	./startdatabase.sh

frontend:
	@echo "Starting frontend in a screen session..."
	screen -dmS frontend bash -c 'cd frontend && npm install && npm run dev; exec bash'

# Run backend in a screen session
backend:
	@echo "Starting backend in a screen session..."
	screen -dmS backend bash -c 'cd backend && npm install && npm run dev; exec bash'

frontlogs:
	docker logs matcha-frontend-1 -f

backlogs:
	docker logs matcha-backend-1 -f

clean:
	rm -rf ./frontend/node_modules
	rm -rf ./backend/node_modules

fclean: clean
	./stop.sh

stop:
	docker-compose down

migrate:
	docker exec -it matcha-backend-1 sh -c "npx prisma migrate dev --name init"

studio:
	docker exec -it matcha-backend-1 sh -c "npx prisma studio"

lint:
	docker exec -it matcha-backend-1 sh -c "npx eslint ."

# front:
# 	docker exec -it vite_docker sh -c "npm install && npm run dev"

# back:
# 	docker exec -it matcha-backend-1 sh -c "npm install nodemon && npm install && nodemon main.js"