pipeline {
    agent any

    environment {
        NODE_ENV = "${env.NODE_ENV}"
        APP_PORT = "${env.APP_PORT}"
        MARIADB_ROOT_PASSWORD = "${env.MARIADB_ROOT_PASSWORD}"
        MARIADB_DATABASE = "${env.MARIADB_DATABASE}"
        MARIADB_PORT = "${env.MARIADB_PORT}"
        DATABASE_URL = "mysql://root:${env.MARIADB_ROOT_PASSWORD}@db:${env.MARIADB_PORT}/${env.MARIADB_DATABASE}"
    }

    stages {
        // stage('Create Volume') {
        //     steps {
        //         script {
        //             sh '''
        //             if ! docker volume ls --format "{{.Name}}" | grep -w mariadb-data > /dev/null; then
        //                 docker volume create mariadb-data
        //                 echo "Volume mariadb-data created."
        //             else
        //                 echo "Volume mariadb-data already exists."
        //             fi
        //             '''
        //             sh '''
        //             if ! docker volume ls --format "{{.Name}}" | grep -w mariadb-cnf > /dev/null; then
        //                 docker volume create mariadb-cnf
        //                 echo "Volume mariadb-cnf created."
        //             else
        //                 echo "Volume mariadb-cnf already exists."
        //             fi
        //             '''
        //         }
        //     }
        // }

        stage('Down Containers') {
            steps {
                script {
                    sh 'docker-compose down'
                }
            }
        }

        stage('Remove Images') {
            steps {
                sh '''
                #!/bin/bash
                IMAGES=$(docker-compose config | grep 'image:' | awk '{print $2}')
                for IMAGE in $IMAGES
                do
                  if [ "$(docker images -q $IMAGE)" ]; then
                    echo "Removing image: $IMAGE"
                    docker rmi $IMAGE
                  else
                    echo "Image $IMAGE does not exist"
                  fi
                done
                '''
            }
        }

        stage('Build') {
            steps {
              sh 'docker-compose up --build -d'
              sh 'docker-compose exec app npx prisma db push'
            }
        }
    }
}

