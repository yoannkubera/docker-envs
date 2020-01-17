/*==============================================================================
 *
 * Library reading the content of the configuration file and providing functions
 * helping the construction of the base URI used to access the API.
 *
 * This library assumes that the javascript file defining the configuration
 * object has already been loaded (see the "config.template.js" template file).
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

/**
 * Checks that the provided object corresponds to a valid configuration object.
 * @param config The configuration object, as described in the template file.
 * @throws Error If the configuration object is not valid.
 */
function checkConfigValidity( config ) {
	// TODO
}

/**
 * Gets the base URI where to access the web API.
 * @return 	The base URI, pointing to the root of the API.
 * 					The URI does not end with a "/" character.
 * @throws Error If the configuration object is not valid.
 */
function getWebApiBaseURI( ) {
	/* First check that the loaded configuration is valid. */
	checkConfigValidity( config );
	/* Then start the initialization of the URI */
	var uri = "";
	/* Add the appropriate protocol to the URI. */
	if( config.api.https ) {
		uri += "https://";
	} else {
		uri += "http://";
	}
	/* Add the host */
		uri += config.api.host;
	/* Add the port (if existing) */
	if( config.api.port !== null ) {
		uri += ":" + config.api.port;
	}
	/* Add the path */
	uri += path;
	/* Finally return the URI */
	return uri;
}
