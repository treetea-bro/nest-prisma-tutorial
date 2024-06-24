docker build -t jenkins-nodejs ./jenkins/.
docker compose --env-file .env.prod -f docker-compose.yml -f docker-compose.prod.yml up --build -d
docker compose exec app npx prisma db push
