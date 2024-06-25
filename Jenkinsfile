pipeline {
    agent any
    environment {
        NODE_ENV=credentials('NODE_ENV')
        APP_PORT=credentials('APP_PORT')
        MARIADB_ROOT_PASSWORD=credentials('MARIADB_ROOT_PASSWORD')
        MARIADB_DATABASE=credentials('MARIADB_DATABASE')
        // MARIADB_USER=credentials('MARIADB_USER')
        // MARIADB_PASSWORD=credentials('MARIADB_PASSWORD')
        MARIADB_PORT=credentials('MARIADB_PORT')
        DATABASE_URL=credentials('DATABASE_URL')
    }

    stages {
        stage('Build') { 
            steps {
                sh 'npm install -g pnpm@latest'
                sh 'pnpm install'
                sh 'pnpm run build'
                sh 'rm -rf ./src'
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

        stage('Test') { 
            steps {
                echo  '테스트 단계와 관련된 몇 가지 단계를 수행합니다.'
            }
        }

        stage('Docker compose stop') {
            steps {
                sh 'echo "docker compose stop"'
                sh """
                docker-compose stop
                """
            }
            post {
                success { 
                    sh 'echo "Docker compose stop Success"'
                }
                failure {
                    sh 'echo "Docker compose stop Fail"'
                }
            }
        }

        stage('Prune Docker data') {
            steps {
                sh 'echo "Prune Docker data"'
                sh 'docker system prune -a --volumes -f'
            }
            post {
                success {
                    sh 'echo "Prune Docker data Success"'
                }
                failure {
                    sh 'echo "Prune Docker data Fail"'
                }
            }
        }

        stage('Docker Deploy') {
            steps {
                sh 'bash build.prod.sh'
            }
            post {
                success {
                    echo 'docker compose success'
                }
                failure {
                    echo 'docker compose failed'
                }
            }
        }

        // stage('Dockerizing'){
        //     steps{
        //         sh 'echo " Image Bulid Start"'
        //         sh 'docker build . -t nest-prisma-tutorial-app'
        //     }
        //     post {
        //         success {
        //             sh 'echo "Bulid Docker Image Success"'
        //         }
        //         failure {
        //             sh 'echo "Bulid Docker Image Fail"'
        //         }
        //     }
        // }

        // stage('Deploy') {
        //     steps {
        //         sh 'docker run --name app -d -p 3001:3001 nest-prisma-tutorial-app'
        //     }
        //     post {
        //         success {
        //             echo 'success'
        //         }
        //         failure {
        //             echo 'failed'
        //         }
        //     }
        // }
    }
}
