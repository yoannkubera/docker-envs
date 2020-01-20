#!/bin/bash
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#
# Script runned when starting up a container built using the mysql dockerfile.
# It searches for database initialization scripts in sub-directories of "/srv/sql"
# and runs them in the alphabetical order of their path.
#
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
set -e

DB_INIT_SCRIPTS_PATH="/srv/sql"
MYSQL_CREDENTIALS_PATH="/tmp/mysql-credentials.conf"

# Create the mysql credentials file.
echo "Creating the MySQL credentials file..."
echo -e "[client]\nhost=localhost\nuser=root\npassword=${MYSQL_ROOT_PASSWORD}" > "${MYSQL_CREDENTIALS_PATH}"
cat "${MYSQL_CREDENTIALS_PATH}"

# Run the database initialization scripts
for f in $(find "${DB_INIT_SCRIPTS_PATH}" -name "*.sql" | sort); do
	echo "Running the database initialization script '$f'..."
	mysql --defaults-extra-file="${MYSQL_CREDENTIALS_PATH}" -e "SOURCE $f" --silent "$MYSQL_DATABASE"
done

# Tell that the initialization finished.
echo "The database is now initialized!"
