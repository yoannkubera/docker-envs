# Dockerfile
FROM php:7.4.1-apache

# The apache server will be provided through the 80 port of the container.
EXPOSE 80
# The base directory of the container will be the apache home.
WORKDIR /var/www/html

# Update the server
RUN apt-get update -qy && \
    apt-get install -y \
    unzip \
    zip && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy the entrypoint script at an appropriate location
COPY ./docker-dev-env/apache/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

# Define the entrypoint script of the docker image during execution
ENTRYPOINT ["/bin/bash","/usr/local/bin/docker-entrypoint.sh"]
