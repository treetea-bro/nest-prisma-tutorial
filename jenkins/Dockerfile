FROM jenkins/jenkins:lts

USER root

# Set the SHELL option
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Install Node.js and npm with specific version 20.x
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
  apt-get update && \
  apt-get install -y --no-install-recommends nodejs=20.* && \
  rm -rf /var/lib/apt/lists/*

USER jenkins
