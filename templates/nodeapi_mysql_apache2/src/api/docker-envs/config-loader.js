/*==============================================================================
 *
 * Nodejs module dedicated to the loading of the configuration of the application.
 *
 *------------------------------------------------------------------------------
 *
 * Copyright (c) 2020 Yoann KUBERA (https://github.com/yoannkubera). All rights
 * reserved.
 *
 * This work is licensed under the terms of the MIT license.
 * For a copy, see <https://opensource.org/licenses/MIT>.
 *
 ==============================================================================*/

/* ----------------------------------------------------------------------------
 --
 -- LOAD DEPENDENCIES
 --
 ---------------------------------------------------------------------------- */

const _fs = require( 'fs' );

/* ----------------------------------------------------------------------------
 --
 -- CONSTANTS DECLARATION
 --
 ---------------------------------------------------------------------------- */

// The path of the default configuration file.
var _DEFAULT_CONFIG_PATH = "config.js";
// The encoding used to read the configuration file.
var _READ_FORMAT = "ut8";

/* ----------------------------------------------------------------------------
  --
  -- DECLARING FUNCTION USED IN THE MODULE TO LOAD THE CONTENT OF THE CONFIG
  --
  ---------------------------------------------------------------------------- */

/**
 * Identify the path towards the configuration file of the web API, by reading
 * the content of the command line arguments.
 * @param args 	The object storing the command line arguments with which the server
 *							was started. Has to be "process.argv".
 * @return The path towards the configuration file to use.
 */
function _getConfigFileName( args ) {
	// Initialize the path.
	var path = _DEFAULT_CONFIG_PATH;
	// The first two arguments are ignored, since they are "node" followed by the
	// name of the entrypoint script.
	if( args.length > 2 ) {
	  path = args[ 2 ];
	}
	// Return the path.
	return path;
}

/**
 * Reads the configuration file and outputs an object modeling it.
 * @param path The path towards the configuration file.
 * @return An object modeling the configuration. See the documentation
 *				 of the "load" function of the module defined below for more information.
 */
function _readConfigFile( path ) {
	// Check that the file exists.
	if( ! _fs.existsSync( path ) ) {
		throw new Error( "The configuration file '" + path + "' does not exist!" );
	}
	// Check that the file is readable.
	if( ! _fs.accessSync( path, _fs.constants.R_OK ) ) {
		throw new Error( "The configuration file '" + path + "' is not readable!" );
	}
	// Load the content of the file as UTF8 content.
	var fileContent = _fs.readFileSync( path, _READ_FORMAT );
	// Parse the content as JSON.
	var jsonContent = JSON.parse( fileContent );
	// Check the content validity
	_checkConfigFile( jsonContent );
	// Finally return the object.
	return jsonContent;
}

/**
 * Checks that the provided parameter models appropriate configuration
 * information.
 * @param config The object modeling the configuration.
 * @throws An error if the object is not an appropriate configuration.
 */
function _checkConfigFile( config ) {
	console.log( "NYI: Check the validity of the content of the configuration file" );
}

/* ----------------------------------------------------------------------------
	 --
   -- EXPORTING THE MODULE
 	 --
   ---------------------------------------------------------------------------- */

module.exports = {
	/**
	 * Loads the configuration file provided in the command line arguments (or the
   * default "./config.json" if none is provided), checks the validity of its
	 * content and then build an object modeling its content.
	 * @param args 	The command line arguments array, as returned by the
	 *							"process.argv" code.
	 * @return An object modeling the configuration. This object defines the
	 * 				 following keys and values:
	 *					- "database" defining the credentials to access the database. It is
	 *						an object defining the following keys and values:
	 *							- "host": The name of the host where the database is installed
	 *							- "port": The port where to access the database on that host
	 *							- "user": The username used to connect to the database
	 *							- "password": The password used to connect to the database
	 *							- "name": The name of the database
	 *					- "api" defining the how the express library starts the web API
	 *						server. It is an object defining the following keys and values:
	 *							- "host": Defines the IP from which the API is reachable. Has to
	 *												be "0.0.0.0" if it is reachable from everywhere;
	 *							- "port": Defines the port at which the API is reachable.
	 * @throws Error If the configuration file contains errors.
	 */
	load: function ( args ){
		// Get the config file name.
		var config_path = _getConfigFileName( args );
		// Parse the file to get the config object, and check its validity.
		return _readConfigFile( config_path );
	}
};
