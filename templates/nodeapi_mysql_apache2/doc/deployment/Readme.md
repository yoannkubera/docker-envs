[Back to the main documentation](../../Readme.md)

# Deployment guide

This guide tells how to deploy this application onto a server, or on a set of
servers.

## Deploying the database

To deploy the database:

1. Install on the server a MySQL client as well as a MySQL server;

1. Create the database used by the application, by using the following command
   in the MySQL client. In this example, we assume that the database is _testdb_:

    ```mysql
	  CREATE DATABASE testdb;
		```

1. Create the user that will be used by the API to access the database. In this
   example, we assume that the user is named _myuser_, has the password _123456Pass_
	 and is hosted on the same server than the API (thus using the _locahost_ host):

    ```mysql
    CREATE USER 'myuser'@'localhost';
		SET PASSWORD FOR 'myuser'@'localhost' = PASSWORD('123456Pass');
		GRANT ALL PRIVILEGES ON 'testdb'.'*' TO 'myuser'@'localhost';
    ```

1. Copy the initialization scripts from the directory `src/sql/base/` on the
   server;

1. Run each of these initialization script in the alphabetical order onto the
   _testdb_ database, by typing the following mysql client command (for Debian
	servers):

    ```
		mysql -u root -p -e "SOURCE path_to_script" testdb
		```

## Deploying the API

To deploy the API:

1. Copy the content of the `src/api` directory into the API dedicated directory
   of the server;

1. Remove the unneccessary files `.dockerignore`, `.gitignore`;

1. Rename the file `config.template.json` as `config.json`;

1. Edit the `config.json` file and replace the various placeholders with
   appropriate information:

    * `@@DB_HOST@@` with the host name where to find the database. It has to be
			_localhost_ if the database is hosted on the same server than the API;

		* `@@DB_PORT@@` with the port on which a connection is possible on the
			database. _3126_ if the default value is used;

		* `@@DB_USER@@` with the database user that can be used by the API to read
			or write data in the database;

		* `@@DB_PWD@@` with the database password for that user;

		* `@@DB_NAME@@` with the name of the database used by the API;

		* `@@API_HOST@@` with the host name or the IP adress of the server providing
			the API. By default, the value _0.0.0.0_ accepts any kind of host (unsecure);

		* `@@API_PORT@@` with the port of the server through which the web API is
		  accessed;

1. Load the dependencies of the web API, by typing the following command from the
   directory of the API:

    ```
		node install
    ```

1. Start the server:

    * Using the nodejs command line from the directory of the API:

        ```
        node api.js config.json
        ```

    * By installing it as a systemd service (Debian):

        * https://tibbo.com/linux/nodejs/service-file.html
				* http://www.throrinstudio.com/dev/web/nodejs-service-et-redemarrage-automatique/

    * By using the `pm2` module of nodejs:

		    * https://pm2.keymetrics.io/docs/usage/quick-start/

## Deploying the client interface

To deploy the client interface:

1. Install an Apache2 service on the server hosting the client interface;

1. Configure an apache2 virtual host;

1. In the root directory of the virtual host, paste the content of the `src/client`
   directory;

1. Remove the unneccessary files `.dockerignore`, `.gitignore`;

1. Move the file `vendor/docker-envs/config.template.json` to the root of the
   virtual host, and rename it to `config.json`;

1. Edit the `config.json` file and replace the various placeholders with
  appropriate information:

    * `@@API_HTTPS@@` with either _true_ if the web API is accessed through https.
			_false_ else;
    * `@@API_HOST@@` with the name of the host where to find the API (the IP or
			domain name of the server hosting the API);
    * `@@API_PORT@@` with the port on which the API is accessed;
    * `@@API_PATH@@` with the path towards the base URI of the API in the domain.
		  This value should neither start nor end with the _'/'_ character, and must
			not contain _GET_ attributes;

1. Start the configured apache VHost.
