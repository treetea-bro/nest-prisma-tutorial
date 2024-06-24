pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
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
                sh 'echo "Docker Rm Start, docker 컨테이너가 현재 돌아갈시 실행해야함"'
                sh """
                docker stop nest-prisma-tutorial-app
                docker rm nest-prisma-tutorial-app
                docker rmi -f nest-prisma-tutorial-app
                """
            }
            post {
                success { 
                    sh 'echo "Docker Rm Success"'
                }
                failure {
                    sh 'echo "Docker Rm Fail"'
                }
            }
        }

        stage('Dockerizing'){
            steps{
                sh 'echo " Image Bulid Start"'
                sh 'docker build . -t nest-prisma-tutorial-app'
            }
            post {
                success {
                    sh 'echo "Bulid Docker Image Success"'
                }
                failure {
                    sh 'echo "Bulid Docker Image Fail"'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker run --name app -d -p 3001:3001 nest-prisma-tutorial-app'
            }
            post {
                success {
                    echo 'success'
                }
                failure {
                    echo 'failed'
                }
            }
        }
    }
}
