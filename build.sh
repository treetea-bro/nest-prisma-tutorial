docker compose up --build -d
docker compose exec app npx prisma db push
