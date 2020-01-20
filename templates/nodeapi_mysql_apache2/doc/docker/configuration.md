[Go back to the docker documentation](Readme.md)

# Docker configuration

The docker related scripts take over the role of configuring each service so that
they will be able to communicate the one with another, from the information
provided in the configuration file.

When setting up a development environment, or when testing specific features,
the following configurations can be done:

* Changing the configuration of the docker services
* Adding database filling scripts

## Changing the configuration of the docker services

The base configuration of the docker services is stored in the file `.env` from
the directory `docker-dev-env/`. It defines, in a bash like format, variables that
are used to configure the docker containers. These variables are:

* `MYSQL_ROOT_PASSWORD` for the root password of the mysql installation in the
  mysql container;

* `API_MYSQL_DATABASE` for the name of the database created inside the mysql
  container and used by the API to read/store data;

* `API_MYSQL_USER` for the mysql user used by the API to access the database;

* `API_MYSQL_PASSWORD` for the password of the mysql user;

* `API_EXPOSED_PORT` for the port on the host through which the API is published
  and accessible;

* `GUI_PORT` for the port on the host through which the client interface can be
  accessed.

## Adding database filling scripts

By default, the docker ecosystem is configured to run database initialization
scripts located in the `src/sql/base` directory. If it also has to fill the database
with fake data (for debugging / development purposes), then the docker ecosystem
configuration file `docker-compose.yml` from the directory `docker-dev-env/` has
to be modified.

Under the line `- ../src/sql/base/:/docker-entrypoint-initdb.d/01/`, the following
line has to be added using the same indentation. It assumes that the SQL initialization
scripts are located in the `src/sql/sample-data/` directory of the project:

```
- ../src/sql/sample-data/:/docker-entrypoint-initdb.d/02/
```
