[Go back to the docker documentation](Readme.md)

# Development environment

This part of the documentation explains how to set up a development environment
that easily deploys the application onto your host computer, without having to
install and configure a MySQL database, a nodejs client / server or an apache2
server.

## Installation

To set up a development environment for this project, a [docker services ecosystem
template](https://github.com/yoannkubera/docker-envs) is used. To use it, you
have to:

* Install Docker CE (see https://docs.docker.com/install/)

Note that no mysql, apache2 or nodejs installation are necessary on the host
machine, since they will be instead installed inside the docker containers.

## Configuration

The file `.env` from the directory `docker-dev-env/` defines the database access
credentials for the user of the application, as well as the open ports through
which the API and the client interface will be accessible.

The file `docker-compose.yml` from the same directory defines how the various
docker services (nodejs server, mysql server and apache2 server) are initialized.
It especially tells how to initialize the database.

Note that:

* You have to especially check that the provided ports are not already used in your
  system. Else, you should change the content of the `.env` file;

* If you wish to populate the database with information that are not provided by
  the base initialization scripts from the directory `src/sql/base/`, then the
	`docker-compose.yml` file has to be modified.

[configuration.md](Read more about the configuration)

__Warning:__ Changes in those files are not automatically included in the git
repository. If a change __has__ to be taken into account, then the `git add`
command has to be called with the `--force` option.

## Starting the environment

__Warning:__ Before starting the environment, you have to make sure that:

* The database initialization scripts are properly written, since they will be
  automatically run when the docker environment is started (see the documentation
	about the [general file hierarchy](hierarchy-overview.md) of this project);

* The nodejs API is properly implemented. Indeed, once the docker ecosystem is
  started, changes in the nodejs files wont be taken into account, unless you
	stop it and start it again.

To start the docker ecosystem, open a terminal inside the `docker-dev-env/`
directory, and use the following command:

```bash
docker-compose up
```

During the first execution, it will create the docker image for the various
services used for development purposes (nodejs server and apache2 server) and
will dynamically bind the content of the source directories to the images.
It means that the changes in the `src/` directory will be automatically sent
to the services, even when they are running.

You can then access to the API / Client interfaces using a web browser. Note that
the ports might not be the ones described here. Please chech the content of the
`docker-dev-env/.env` file, and especilly the value associated with the _"API_PORT"_
key (port on which the API is accessible) and with the _"GUI_PORT"_ key (port on
which the client interfaces are accessible):

* The URI _"http://localhost:80"_ to access the client interface (and then
	follow the file hierarchy of the subdirectories of the `src/client/`
	directory);

* The URI _"http://localhost:61000"_ to access the API (base URI of the API).

From now on, you can change the code of the client interface. Its changes will
be dynamically taken into account into the corresponding apache2 server.

## Stopping the environment

To stop an already running docker ecosystem, you simply have to use the keyboard
key combination for terminating applications on your operating system, when focus
is done on the console where the ecosystem was started:

* CTRL + C (Linux)
* ALT + F4 (Windows)
* Command + dot (MacOS)

Then, type one of the following commands the release the resources that were used:

* If you do not want to rebuild the docker images during the next execution
  (preferred):

    ```
		docker-compose down
		```

* If you want to rebuild everything, including the system update step and npm
  depencencies download steps (takes longer):

    ```
		docker-compose down -v --rmi local
		docker image prune -f
		docker volume prune -f
		```

	This option should be used if you witness some incoherent behavior when starting
	up the docker environment.
