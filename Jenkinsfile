pipeline {
    agent {
      docker { image 'node:20.15.0-alpine3.20'}
    }

    environment {
        NODE_ENV = "${env.NODE_ENV}"
        APP_PORT = "${env.APP_PORT}"
        MARIADB_ROOT_PASSWORD = "${env.MARIADB_ROOT_PASSWORD}"
        MARIADB_DATABASE = "${env.MARIADB_DATABASE}"
        MARIADB_PORT = "${env.MARIADB_PORT}"
        DATABASE_URL = "mysql://root:${env.MARIADB_ROOT_PASSWORD}@db:${env.MARIADB_PORT}/${env.MARIADB_DATABASE}"
    }

    stages {
        // stage('Create .env File') {
        //     steps {
        //         script {
        //             writeFile file: '.env', text: "NODE_ENV=${env.NODE_ENV}\n" +
        //                      "APP_PORT=${env.APP_PORT}\n" +
        //                      "MARIADB_ROOT_PASSWORD=${env.MARIADB_ROOT_PASSWORD}\n" +
        //                      "MARIADB_DATABASE=${env.MARIADB_DATABASE}\n" +
        //                      "MARIADB_PORT=${env.MARIADB_PORT}\n" +
        //                      "DATABASE_URL=\"mysql://root:${MARIADB_ROOT_PASSWORD}@db:${MARIADB_PORT}/${MARIADB_DATABASE}\""
        //         }
        //     }
        // }

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

    
        stage('Run') { 
            steps {
                sh 'pnpm start:prod'
            }
        }

        // stage('Docker compose stop') {
        //     steps {
        //         sh 'echo "docker-compose stop"'
        //         sh """
        //         docker-compose stop
        //         """
        //     }
        //     post {
        //         success { 
        //             sh 'echo "Docker compose stop Success"'
        //         }
        //         failure {
        //             sh 'echo "Docker compose stop Fail"'
        //         }
        //     }
        // }
        //
        // stage('Prune Docker data') {
        //     steps {
        //         sh 'echo "Prune Docker data"'
        //         sh 'docker system prune -a --volumes -f'
        //     }
        //     post {
        //         success {
        //             sh 'echo "Prune Docker data Success"'
        //         }
        //         failure {
        //             sh 'echo "Prune Docker data Fail"'
        //         }
        //     }
        // }
        //
        // stage('Docker Deploy') {
        //     steps {
        //         sh 'bash build.sh'
        //     }
        //     post {
        //         success {
        //             echo 'docker-compose success'
        //         }
        //         failure {
        //             echo 'docker-compose failed'
        //         }
        //     }
        // }

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
