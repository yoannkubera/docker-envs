[Back to the contribution guide](../CONTRIBUTING.md)

# Overview on the files of the project

The project relies on the following directories:

* `doc/`, obviously dedicated to the documentation of the project
  in the markdown format;

* `docker-dev-env/`, hosting the configuration of the docker container ecosystem
  supporting an easy local deployment of the application to test it during
  development (see the [development environment documentation](docker/Readme.md));

* `src/api`, dedicated to the web API of the application. It includes the noticeable
  files and sub-directories:

    * `package.json`, the file providing metadata about the web API, including
      its dependencies (like `express.js` upon which is built the API);
    * `api.js`, the main entry point of the web API. It takes one argument, being
      the path towards the configuration JSON file of the web API;
    * `config.template.json`, a configuration template of the web API. It illustrates
      the structure of the configuration file, and is also used by the docker
      development ecosystem to generate the configuration of the docker container
      hosting the web API. It tells how to reach the database;
    * `config.json` (usually) the actual configuration file of the web API. Its
      content will be a clone of the template where the placeholders marked
      between _"@@"_ will be replaced with an actual value;
    * `.gitignore`, a file used by git to ignore generated files;
    * `.dockerignore`, a file used by docker to avoid overwriting files and
      directories from the container by files located onto the file system;

* `src/client/`, dedicated to the content of the Apache2 vhost serving the client
  interface. It includes the noticeable files and directories:

  * `.gitignore`, a file used by git to ignore generated files;
  * `config.template.js`, a configuration template of the client. It illustrates
    the structure of the configuration file, and is also used by the docker
    development ecosystem to generate the configuration of the docker container
    hosting the client interface. It tells how to reach the web API;
  * `config.json`, the actual configuration used by the client interface. This
    file is not saved inside the git repository since it depends on the execution
    environment. Its content will be a clone of the template where the placeholders
    marked between _"@@"_ will be replaced with an actual value;
  * `example.html` is an example showing how to use the libraries to make calls
    to the web API and display information on screen;
  * `vendor/`, the directory where all the external libraries of the client
    interface (HTML, JS, _etc._) will be put;
  * `vendor/docker-envs/`, the directory where libraries related to the usage
    of the configuration are defined (for instance to build the base URI to
    access the API).

* `src/sql/`, dedicated to the database initialization scripts. It is made of the
  following sub-directories:

    * `base/` where the tables creation scripts and generic data population scripts
      are put. These scripts will be executed by the container during it startup in
	    the alphabetical order;

    * `sample-data/` where the example and test initialization data are put. To
      initialize the content of the database with such scripts, the `docker-compose.yml`
	    configuration file has to be edited (see the [configuration of the docker
      environment](docker/configuration.md)).
