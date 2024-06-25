pipeline {
    agent any
    environment {
        DOTENV = credentials('.env.prod') // Jenkins 자격 증명에서 .env 파일을 참조
    }

    stages {
        stage('Prepare') {
            steps {
                script {
                    // .env 파일을 Jenkins 작업 디렉토리에 저장
                    writeFile file: '.env.prod', text: env.DOTENV
                }
                git branch: 'main',
                    url: 'https://github.com/treetea-bro/nest-prisma-tutorial.git'
            }
            post {
                success {
                    sh 'echo "Successfully Cloned Repository"'
                }
                failure {
                    sh 'echo "Fail Cloned Repository"'
                }
            }
        }

        stage('Load Env') {
            steps {
                script {
                    // .env 파일 로드
                    sh 'printenv'  // 현재 환경 변수 출력
                    sh 'bash -c "set -o allexport; source .env; set +o allexport"'
                    sh 'printenv'  // 로드 후 환경 변수 출력
                }
            }
        }

    // stages {
    //     stage('Checkout') {
    //         steps {
    //             git branch: 'main',
    //                 url: 'https://github.com/treetea-bro/nest-prisma-tutorial.git'
    //         }
    //         post {
    //             success { 
    //                 sh 'echo "Successfully Cloned Repository"'
    //             }
    //             failure {
    //                 sh 'echo "Fail Cloned Repository"'
    //             }
    //         }
    //     }

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

        stage('Docker Rm') {
            steps {
                sh 'echo "docker compose stop"'
                sh """
                docker compose stop
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
