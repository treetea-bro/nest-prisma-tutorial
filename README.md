## Docker Setting
### Development
1. docker compose up # 이미지 빌드 및 컨테이너 생성
2. docker compose exec app npx prisma db push # prisma db push
3. docker compose exec app npx prisma studio # prisma studio

### Production
1. docker-compose -f docker-compose.yml -f docker-compose.prod.yml up # 이미지 빌드 및 컨테이너 생성
2. docker compose exec app npx prisma db push # prisma db push
3. docker compose exec app npx prisma studio # prisma studio
