FROM jenkins/jenkins:2.452.2-jdk17

WORKDIR /var/jenkins_home/workspace/test

COPY ../.env .

USER root

# Set the SHELL option
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Install lsb-release, Docker CLI, Node.js, npm, and Docker Compose
RUN apt-get update && apt-get install -y --no-install-recommends lsb-release=12.0-1 && \
  curl -fsSLo /usr/share/keyrings/docker-archive-keyring.asc \
  https://download.docker.com/linux/debian/gpg && \
  echo "deb [arch=$(dpkg --print-architecture) \
  signed-by=/usr/share/keyrings/docker-archive-keyring.asc] \
  https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list && \
  apt-get update && apt-get install -y --no-install-recommends docker-ce-cli=* && \
  rm -rf /var/lib/apt/lists/*

USER jenkins

RUN jenkins-plugin-cli --plugins "blueocean docker-workflow"
