FROM jenkins/jenkins:lts

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
  curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
  apt-get install -y --no-install-recommends nodejs=20.15.* && \
  npm install -g pnpm@9.4.0 @nestjs/cli@10.3.2 && \
  DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep '"tag_name"' | sed -E 's/.*"([^"]+)".*/\1/') && \
  curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
  chmod +x /usr/local/bin/docker-compose && \
  rm -rf /var/lib/apt/lists/*

USER jenkins
