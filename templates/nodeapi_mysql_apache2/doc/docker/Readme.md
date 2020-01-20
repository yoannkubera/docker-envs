[Back to the contribution guide](../../CONTRIBUTING.md)

# Nodejs API / MySQL / Apache2 applications

This project relies on the _"Nodejs API / MySQL / Apache2"_ template defined in
the https://github.com/yoannkubera/docker-envs repository.

This template aims at developping applications relying on:

* The NodeJS Express API to build a web API that manages the access to a MySQL
  database;

* An Apache2 server providing HTML/Javascript interfaces accessing to the database
  through the API.

## Description

The docker environment provides a configuration where three services grant access
to the various developed features:

* A MySQL server containing the database of the application, with no persistance
  layer (stopping the container will remove the content of the database). The
	initial content of the database can be configured with a sets of MySQL scripts;

* A nodejs server built upon the Express.js library, serving the web API;

* An apache2 server providing the client interface.

## Docker environment documentation

* [How to install and use the docker enviroment](dev-env.md)
* [Quick access to the configuration guide of the environment](configuration.md)
