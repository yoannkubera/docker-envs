# Dockerfile bundling the API
FROM node:13.6.0

# The API will be provided through the 8080 port of the container.
EXPOSE 8080
# The API will be put in the container into the "/srv/api" directory
WORKDIR /srv/api

# Update the server
RUN apt-get update -qy && \
    apt-get install -y \
    unzip \
    zip \
		mysql-client && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy the entrypoint script at an appropriate location
COPY ./docker-dev-env/api/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

# Define the entrypoint script of the docker image during execution
ENTRYPOINT ["/bin/bash","/usr/local/bin/docker-entrypoint.sh"]

# Tell how to start the server, using the node command when the image loaded as
# a container:
CMD [ "node", "api.js", "/tmp/config.docker.json" ]
