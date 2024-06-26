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

        // stage('DB') {
        //     steps {
        //         script {
        //             // Run the MariaDB container in the background
        //             sh '''
        //             docker run -d --name db --network node-db -p 3306:3306 \
        //                 -e MARIADB_ROOT_PASSWORD=${MARIADB_ROOT_PASSWORD} \
        //                 -e MARIADB_DATABASE=${MARIADB_DATABASE} \
        //                 -v $PWD/mariadb/mariadb-data:/var/lib/mysql mariadb:10
        //             '''
        //         }
        //     }
        // }

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

        stage('Check DB Container') {
            steps {
                script {
                    // Check if the MariaDB container is running
                    sh 'docker ps -f name=db'
                }
            }
        }

        // stage('DB') {
        //     agent {
        //         docker { 
        //             image 'mariadb:10'
        //             args '--name db --network node-db -p 3306:3306 -e MARIADB_ROOT_PASSWORD=${MARIADB_ROOT_PASSWORD} -e MARIADB_DATABASE=${MARIADB_DATABASE} -v $PWD/mariadb/mariadb-data:/var/lib/mysql'
        //             reuseNode true
        //         }
        //     }
        //     environment {
        //         MARIADB_ROOT_PASSWORD = "${env.MARIADB_ROOT_PASSWORD}"
        //         MARIADB_DATABASE = "${env.MARIADB_DATABASE}"
        //     }
        //     steps {
        //         sh 'mariadb --version'
        //     }
        // }

        stage('App') { 
            agent {
                docker { 
                    image 'node:20.15.0-alpine3.20'
                    args '--network node-db -p 3001:3001'
                }
            }

            // environment {
            //     DATABASE_URL = "mysql://root:${env.MARIADB_ROOT_PASSWORD}@db:${env.MARIADB_PORT}/${env.MARIADB_DATABASE}"
            // }

            steps {
                sh 'npm install -g pnpm@latest'
                sh 'pnpm install'
                sh 'pnpm run build'
                sh 'rm -rf ./src'
                sh 'prisma db push'
                sh 'nohup pnpm start:prod &'
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

// pipeline {
//     agent any
//
//     environment {
//         NODE_ENV = "${env.NODE_ENV}"
//         APP_PORT = "${env.APP_PORT}"
//         MARIADB_ROOT_PASSWORD = "${env.MARIADB_ROOT_PASSWORD}"
//         MARIADB_DATABASE = "${env.MARIADB_DATABASE}"
//         MARIADB_PORT = "${env.MARIADB_PORT}"
//         DATABASE_URL = "mysql://root:${env.MARIADB_ROOT_PASSWORD}@db:${env.MARIADB_PORT}/${env.MARIADB_DATABASE}"
//     }
//
//     stages {
//         stage('Setup Network') {
//             steps {
//                 script {
//                     // Check if the network exists, create it if it doesn't
//                     sh '''
//                     if ! docker network ls --format "{{.Name}}" | grep -w node-db > /dev/null; then
//                         docker network create node-db
//                     else
//                         echo "Network node-db already exists"
//                     fi
//                     '''
//                 }
//             }
//         }
//
//         stage('DB') {
//           agent {
//             docker { 
//               image 'mariadb:10'
//               args '--name db --network node-db -p 3306:3306 -v ./mariadb/mariadb-data:/var/lib/mysql'
//             }
//           }
//
//           environment {
//               NODE_ENV = "${env.NODE_ENV}"
//               APP_PORT = "${env.APP_PORT}"
//               MARIADB_ROOT_PASSWORD = "${env.MARIADB_ROOT_PASSWORD}"
//               MARIADB_DATABASE = "${env.MARIADB_DATABASE}"
//               MARIADB_PORT = "${env.MARIADB_PORT}"
//               DATABASE_URL = "mysql://root:${env.MARIADB_ROOT_PASSWORD}@db:${env.MARIADB_PORT}/${env.MARIADB_DATABASE}"
//           }
//
//           steps {
//             sh 'mariadb --version'
//           }
//         }
//     // volumes:
//     //   - ./mariadb/mariadb-data:/var/lib/mysql
//     //   - ./mariadb/mariadb.cnf:/etc/mysql/mariadb.cnf
//
//         stage('App') { 
//             agent {
//               docker { 
//                 image 'node:20.15.0-alpine3.20'
//                 args '--network node-db -p 3001:3001'
//               }
//             }
//
//             steps {
//                 sh 'npm install -g pnpm@latest'
//                 sh 'pnpm install'
//                 sh 'pnpm run build'
//                 sh 'rm -rf ./src'
//                 sh 'pnpm start:prod'
//             }
//             post {
//                 success {
//                     echo 'pnpm build success'
//                 }
//                 failure {
//                     echo 'pnpm build failed'
//                 }
//             }
//         }
//
//         // stage('Test') { 
//         //     steps {
//         //         echo  '테스트 단계와 관련된 몇 가지 단계를 수행합니다.'
//         //     }
//         // }
//
//
//         // stage('Run') { 
//         //     steps {
//         //         sh 'pnpm start:prod'
//         //     }
//         // }
//
//         // stage('Docker compose stop') {
//         //     steps {
//         //         sh 'echo "docker-compose stop"'
//         //         sh """
//         //         docker-compose stop
//         //         """
//         //     }
//         //     post {
//         //         success { 
//         //             sh 'echo "Docker compose stop Success"'
//         //         }
//         //         failure {
//         //             sh 'echo "Docker compose stop Fail"'
//         //         }
//         //     }
//         // }
//         //
//         // stage('Prune Docker data') {
//         //     steps {
//         //         sh 'echo "Prune Docker data"'
//         //         sh 'docker system prune -a --volumes -f'
//         //     }
//         //     post {
//         //         success {
//         //             sh 'echo "Prune Docker data Success"'
//         //         }
//         //         failure {
//         //             sh 'echo "Prune Docker data Fail"'
//         //         }
//         //     }
//         // }
//         //
//         // stage('Docker Deploy') {
//         //     steps {
//         //         sh 'bash build.sh'
//         //     }
//         //     post {
//         //         success {
//         //             echo 'docker-compose success'
//         //         }
//         //         failure {
//         //             echo 'docker-compose failed'
//         //         }
//         //     }
//         // }
//
//         // stage('Dockerizing'){
//         //     steps{
//         //         sh 'echo " Image Bulid Start"'
//         //         sh 'docker build . -t nest-prisma-tutorial-app'
//         //     }
//         //     post {
//         //         success {
//         //             sh 'echo "Bulid Docker Image Success"'
//         //         }
//         //         failure {
//         //             sh 'echo "Bulid Docker Image Fail"'
//         //         }
//         //     }
//         // }
//
//         // stage('Deploy') {
//         //     steps {
//         //         sh 'docker run --name app -d -p 3001:3001 nest-prisma-tutorial-app'
//         //     }
//         //     post {
//         //         success {
//         //             echo 'success'
//         //         }
//         //         failure {
//         //             echo 'failed'
//         //         }
//         //     }
//         // }
//     }
// }
