#!/bin/bash
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#
# Script runned when starting up a container built using the apache dockerfile.
# It generates the appropriate API access configuration file.
#
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
set -e

# Create or update the docker configuration file.
echo "Creating / Updating the configuration JSON for accessing the database, using the configuration:"
cp vendor/docker-envs/js/config.template.js config.js
sed -i "s/@@API_HTTPS@@/false/g" config.js
sed -i "s/@@API_HOST@@/${API_HOST}/g" config.js
sed -i "s/@@API_PORT@@/${API_PORT}/g" config.js
sed -i "s/@@API_PATH@@//g" config.js

cat config.js

# Wait for the API service to start.
#echo "Waiting for the web API to start..."
#until curl -i "http://${API_HOST}:${API_PORT}/version" 2>&1 /dev/null ; do
#  echo "Web API not accessible. Waiting..."
#  sleep 1
#done

# Finally run the base command, defined using CMD in the dockerfile
echo "Starting the server, with the command: $@"
exec "$@"
