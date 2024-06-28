if ! docker volume ls --format "{{.Name}}" | grep -w mariadb-data >/dev/null; then
	docker volume create mariadb-data
	echo "Volume mariadb-data created."
else
	echo "Volume mariadb-data already exists."
fi

if ! docker volume ls --format "{{.Name}}" | grep -w mariadb-cnf >/dev/null; then
	docker volume create mariadb-cnf
	echo "Volume mariadb-cnf created."
else
	echo "Volume mariadb-cnf already exists."
fi

docker-compose down

IMAGES=$(docker-compose config | grep 'image:' | awk '{print $2}')
for IMAGE in $IMAGES; do
	if [ "$(docker images -q $IMAGE)" ]; then
		echo "Removing image: $IMAGE"
		docker rmi $IMAGE
	else
		echo "Image $IMAGE does not exist"
	fi
done

docker compose --env-file .env.dev -f docker-compose.yml -f docker-compose.dev.yml up --build -d
docker compose exec app npx prisma db push
