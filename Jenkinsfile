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
            	// gralew이 있어야됨. git clone해서 project를 가져옴.
                sh 'chmod +x gradlew'
                sh  './gradlew clean build'
                sh 'ls -al ./build'
            }
            post {
                success {
                    echo 'gradle build success'
                }
                failure {
                    echo 'gradle build failed'
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
                docker stop docker-jenkins-pipeline-test2
                docker rm docker-jenkins-pipeline-test2
                docker rmi -f mooh2jj/docker-jenkins-pipeline-test2
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
                sh 'docker build . -t mooh2jj/docker-jenkins-pipeline-test2'
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
                sh 'docker run --name docker-jenkins-pipeline-test2 -d -p 8083:8083 mooh2jj/docker-jenkins-pipeline-test2'
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
