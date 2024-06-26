docker build -t jenkins ./jenkins/.
docker compose -f ./jenkins/docker-compose.yml up --build -d
