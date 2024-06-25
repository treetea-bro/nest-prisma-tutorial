docker compose --env-file .env.dev -f docker-compose.yml -f docker-compose.dev.yml up --build -d
docker compose exec app npx prisma db push
