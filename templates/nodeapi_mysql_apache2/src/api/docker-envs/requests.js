/*==============================================================================
 *
 * Nodejs module dedicated to the management of requests to the API.
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

const _cors = require("cors");

/* ----------------------------------------------------------------------------
	 --
	 -- CONSTANTS DECLARATION
	 --
	 ---------------------------------------------------------------------------- */

// The encoding used to read the configuration file.
var _READ_FORMAT = "ut8";

/* ----------------------------------------------------------------------------
	 --
	 -- DECLARATION OF THE FUNCTIONS OF THE MODULE
	 --
	 ---------------------------------------------------------------------------- */

/**
 * Sets the custom responses headers of the API when answering a request of a
 * client.
 * @param res The HTTP response that will be sent (an object).
 */
function _set_headers( res ) {
	// Allow requests from any source
	res.setHeader( 'Access-Control-Allow-Origin', '*' );
	// Define which HTTP methods are allowed.
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	// Define which HTTP headers can be used during the actual request (sent with
	// a preflight request)
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	// TODO Not sure if usefull
	res.setHeader('Access-Control-Allow-Credentials', true);
}

/**
 * Function used to manage requests at a route while not triggering CORs errors
 * (cross references) with the requester has not the same host/port than the API.
 * @param app The instantiated express server.
 * @param route The route.
 */
function _cors( app, route ) {
	// TODO: Check if better implementation by following https://expressjs.com/en/resources/middleware/cors.html
	app.head( route, _cors( ), (req, res) => {
		res.sendStatus( 204 );
	});
}

/* ----------------------------------------------------------------------------
	 --
   -- EXPORTING THE MODULE
 	 --
   ---------------------------------------------------------------------------- */

module.exports = {
	headerSetting: _set_headers,
	cors: null
};
