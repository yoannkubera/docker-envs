# Nodejs API connected to a MySQL database and Apache2 served client interface

This readme file presents how to use this template to develop your application
relying on a web API and an apache server providing a client interface.

## How to use this template?

The template is in an almost ready-to-use state with:

* A simple API answering the GET requests going to the URI "http://localhost:61000/version",
  and returning a version text;

* A simple client interface displaying the version number provided by the API.

### Minimal configuration

The minimal configuration of this template consists in:

* Manually editing the configuration template file of the API (file
	`config.template.json` from the directory `src/api`), and providing appropriate
	values for the placeholders:

    * `@@API_VERSION@@`: A text describing the current version of the API (it
			should represent the same number than the one provided in the `package.json`
			file);

    * `@@API_DESC@@`: The name of the API, or a short description;

* Editing the `package.json` file from the same directory, and providing appropriate
  values to the _"name"_ and _"description"_ fields;

* Editing the `.env` file of the `docker-dev-env/` direcotry and changing the value
  associated with the following keys:

    * `API_EXPOSED_PORT` with a port number on which the API will be made available
		  to the host by the docker ecosystem. By default, the port is `61000`;

    * `GUI_PORT` with a port number on which the client interface will be made
		  available to the host by the docker ecosystem. By default, the port is `80`;

* Force the addition of these changes to git, by using the following command
  in a terminal opened in the base directory of the project:

    ```bash
    git add --force docker-dev-env/.env src/api/config.template.json
    ```

<center>__For more information, please read the [contribution guide](CONTRIBUTING.md)__</center>

### Test the docker ecosystem

To run a preconfigured docker ecosystem running the application:

* Install Docker CE (see https://docs.docker.com/install/);

* Open a terminal in the `docker-dev-env/` directory, and type the following
  command:

    ```bash
		docker-compose up
		```

* Once the various downloads and service setup ends, then open a web browser at
  the following URI (the port might have to be changed):

    `http://localhost:80/example.html`

## Preparing your project

Once you did everything, congratulations, everything is ready to work!

You can now:

1. Empty this readme file, and fill it with appropriate information about your
   project;

1. Add in the new readme file a link towards the documentation about the [deployment
   of the application](doc/deployment/Readme.md) and the [contribution guide
	 ](CONTRIBUTING.md);

1. Clear the content of the `src/sql/base/01__create_tables.sql` script, and
   replace with your own database declarations. The database will be initialized
	 by running in the alphabetical order these scripts;

1. Complete the content of the `package.json` file of the `src/api/` directory;

1. Add [Express.js routes](https://expressjs.com/en/guide/routing.html) to the
   API by editing the _"DEFINE THE ROUTES OF THE EXPRESS SERVER"_ section of the
	 `src/api/api.js` source file;

1. Change the client interface by adding or editing the files inside the
   `src/client` directory;

1. Complete the documentation with missing information about your project.
   If possible, be kind enough to credit the use of this template by putting a
	 link to its [github repository](https://github.com/yoannkubera/docker-envs)
   :smile:

## Credits

This application template was written by [Yoann KUBERA](https://github.com/yoannkubera),
working at the [LGI2A laboratory](https://www.lgi2a.univ-artois.fr) from the [Artois
University](https://www.univ-artois.fr), and is under the [MIT LICENSE](LICENSE).

It has been tested on an Ubuntu 18.04 LTS system, having the dependencies described
below. The author does not guarantee that it would work in other types of environments.

### Dependencies

The docker development ecosystem relies on:

| Name                                                                 | Type         | Version      | License                       |
|:--------------------------------------------------------------------:|:------------:|:------------:|:-----------------------------:|
| [Docker CE](https://docs.docker.com/install/linux/docker-ce/ubuntu/) | Software     | 19.03.5      | Apache 2.0 license            |
| [MySQL](https://hub.docker.com/_/mysql)                              | Docker image | 5.7.29       | GNU General Public License v2 |
| [PHP - Apache2](https://hub.docker.com/_/php)                        | Docker image | 7.4.1-apache | PHP License v3.01             |
| [Node](https://hub.docker.com/_/node/)                               | Docker image | 13.6.0       | MIT License                   |

The client interface relies on:

| Name                                                                        | Type         | Version | License     |
|:---------------------------------------------------------------------------:|:------------:|:-------:|:-----------:|
| [JQuery](https://jquery.com/)                                               | JS library   | 3.4.1   | MIT License |
| Docker-envs (javascript library developped in the context of this template) | JS library   | ---     | MIT License |


The API has been developped and tested on the following technologies and versions:

| Name                                                           | Type          | Version        | License     |
|:--------------------------------------------------------------:|:-------------:|:--------------:|:-----------:|
| [Node.js](https://nodejs.org/en/)                              | Software      | 13.6.0         | MIT License |
| [Express.js](http://expressjs.com/)                            | NodeJS module | 4.17.1         | MIT License |
| [Cors](https://github.com/expressjs/cors#readme)               | NodeJS module | 2.8.5          | MIT License |
| [FS](https://github.com/npm/security-holder#readme)            | NodeJS module | 0.0.1-security | ISC License |
