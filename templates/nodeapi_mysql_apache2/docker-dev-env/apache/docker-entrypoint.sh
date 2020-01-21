#!/bin/bash
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#
# Script runned when starting up a container built using the apache dockerfile.
# It generates the appropriate API access configuration file.
#
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
set -e

CONFIG_PATH="./config.js"

# Create or update the docker configuration file.
echo "Creating / Updating the configuration JSON for accessing the database, using the configuration:"
cp vendor/docker-envs/js/config.template.js "${CONFIG_PATH}"
sed -i "s/@@API_HTTPS@@/false/g" "${CONFIG_PATH}"
sed -i "s/@@API_HOST@@/${API_HOST}/g" "${CONFIG_PATH}"
sed -i "s/@@API_PORT@@/${API_PORT}/g" "${CONFIG_PATH}"
sed -i "s/@@API_PATH@@//g" "${CONFIG_PATH}"
cat "${CONFIG_PATH}"

# Wait for the API service to start.
#echo "Waiting for the web API to start..."
#http_code=000
#until [ $http_code -eq 200 ]; do
#  http_code=$(curl -s -o /dev/null -w "%{http_code}" "http://${API_INNER_HOST}:${API_INNER_PORT}/version")
#  echo "CODE $http_code"
#  if [ "$http_code" -ne "200" ]; then
#    echo "Web API not accessible (got $http_code). Waiting..."
#    sleep 1
#  fi
#done
#echo "The Web API is now accessible!"

# Finally run the base command, defined using CMD in the dockerfile
echo "Starting the server, with the command: $@"
exec "$@"
