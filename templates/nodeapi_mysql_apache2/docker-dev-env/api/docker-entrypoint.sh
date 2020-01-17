#!/bin/bash
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#
# Script runned when starting up a container built using the nodejs dockerfile.
# It generates the appropriate temporary database access configuration file as
# well as the node_module directory with the dependencies of the nodejs server.
#
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
set -e

# Create or update the docker configuration file.
echo "Creating / Updating the configuration JSON for accessing the database, using the configuration:"
cp config.template.json /tmp/config.docker.json
sed -i "s/@@DB_HOST@@/${MYSQL_HOST}/g" /tmp/config.docker.json
sed -i "s/@@DB_PORT@@/${MYSQL_PORT}/g" /tmp/config.docker.json
sed -i "s/@@DB_USER@@/${MYSQL_USER}/g" /tmp/config.docker.json
sed -i "s/@@DB_PWD@@/${MYSQL_PASSWORD}/g" /tmp/config.docker.json
sed -i "s/@@DB_NAME@@/${MYSQL_DATABASE}/g" /tmp/config.docker.json
sed -i "s/@@API_HOST@@/${API_HOST}/g" /tmp/config.docker.json
sed -i "s/@@API_PORT@@/${API_PORT}/g" /tmp/config.docker.json
sed -i "s/@@API_DESC@@/${API_DESC}/g" /tmp/config.docker.json
sed -i "s/@@API_VERSION@@/${API_VERSION}/g" /tmp/config.docker.json
cat /tmp/config.docker.json

# Download the nodejs missing dependencies.
echo "Fetching the missing nodejs dependencies..."
npm install --quiet

# Create the mysql credentials file.
#echo -e "[client]\nhost=${MYSQL_HOST}\nport=${MYSQL_PORT}\nuser=${MYSQL_USER}\npassword=${MYSQL_PASSWORD}" > /tmp/mysql-credentials.conf

# Wait for the database service to start.
#echo "Waiting for the database to start..."
#until mysql --defaults-extra-file="/tmp/mysql-credentials.conf" -e "SELECT 1" 2>&1 /dev/null ; do
#  echo "Database not accessible. Waiting..."
#  sleep 1
#done

# Finally run the base command, defined using CMD in the dockerfile
echo "Starting the server, with the command: $@"
exec "$@"
