#!/bin/bash
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#
# Script runned when starting up a container built using the nodejs dockerfile.
# It generates the appropriate temporary database access configuration file as
# well as the node_module directory with the dependencies of the nodejs server.
#
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
set -e

DOCKER_CONFIG_PATH="/tmp/config.docker.json"
MYSQL_CREDENTIALS_PATH="/tmp/mysql-credentials.conf"

# Create or update the docker configuration file.
echo "Creating / Updating the configuration JSON for accessing the database, using the configuration:"
cp docker-envs/config.template.json "${DOCKER_CONFIG_PATH}"
sed -i "s/@@DB_HOST@@/${MYSQL_HOST}/g" "${DOCKER_CONFIG_PATH}"
sed -i "s/@@DB_PORT@@/${MYSQL_PORT}/g" "${DOCKER_CONFIG_PATH}"
sed -i "s/@@DB_USER@@/${MYSQL_USER}/g" "${DOCKER_CONFIG_PATH}"
sed -i "s/@@DB_PWD@@/${MYSQL_PASSWORD}/g" "${DOCKER_CONFIG_PATH}"
sed -i "s/@@DB_NAME@@/${MYSQL_DATABASE}/g" "${DOCKER_CONFIG_PATH}"
sed -i "s/@@API_HOST@@/${API_HOST}/g" "${DOCKER_CONFIG_PATH}"
sed -i "s/@@API_PORT@@/${API_PORT}/g" "${DOCKER_CONFIG_PATH}"
cat "${DOCKER_CONFIG_PATH}"

# Download the nodejs missing dependencies.
echo "Fetching the missing nodejs dependencies..."
npm install

# Create the mysql credentials file.
echo "Creating the MySQL credentials file..."
echo -e "[client]\nhost=${MYSQL_HOST}\nport=${MYSQL_PORT}\nuser=${MYSQL_USER}\npassword=${MYSQL_PASSWORD}" > "${MYSQL_CREDENTIALS_PATH}"
cat "${MYSQL_CREDENTIALS_PATH}"

# Wait for the database service to start.
echo "Waiting for the database to start..."
until mysql --defaults-extra-file="${MYSQL_CREDENTIALS_PATH}" -e "SELECT 1" > /dev/null  2>&1; do
  echo "Database not accessible. Waiting..."
  sleep 1
done
echo "The database is now accessible!"

# Finally run the base command, defined using CMD in the dockerfile
echo "Starting the server, with the command: $@"
exec "$@"
