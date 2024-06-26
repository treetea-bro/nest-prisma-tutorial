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
        stage('Setup Network') {
            steps {
                script {
                    // Check if the network exists, create it if it doesn't
                    sh '''
                    if ! docker network ls --format "{{.Name}}" | grep -w node-db > /dev/null; then
                        docker network create node-db
                    else
                        echo "Network node-db already exists"
                    fi
                    '''
                }
            }
        }

        stage('Start DB Container') {
            steps {
                script {
                    // Check if the MariaDB container is already running, if so, do nothing
                    sh '''
                    if [ $(docker ps -q -f name=db) ]; then
                        echo "DB container is already running"
                    else
                        # Start a new MariaDB container in detached mode
                        docker run -d --name db --network node-db -p 3306:3306 \
                            -e MARIADB_ROOT_PASSWORD=${MARIADB_ROOT_PASSWORD} \
                            -e MARIADB_DATABASE=${MARIADB_DATABASE} \
                            -v $PWD/mariadb/mariadb-data:/var/lib/mysql mariadb:10
                    fi
                    '''
                }
            }
        }

        stage('App') { 
            agent {
                docker { 
                    image 'node:20.15.0-alpine3.20'
                    args '--network node-db -p 3001:3001 -v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            steps {
                sh 'docker'
                // sh 'npm install -g pnpm@latest'
                // sh 'pnpm install'
                // sh 'pnpm run build'
                // sh 'rm -rf ./src'
                // sh 'npx prisma db push'
                // sh 'nohup pnpm start:prod &'
            }
            post {
                success {
                    echo 'pnpm build success'
                }
                failure {
                    echo 'pnpm build failed'
                }
            }
        }
    }
}

