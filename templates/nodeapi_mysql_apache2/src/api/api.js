/*==============================================================================
 *
 * Main access point of the API, defining all the routing rules.
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
 -- LOAD THE DEPENDENCIES
 --
 ---------------------------------------------------------------------------- */

/*
 * Vendor dependencies
 */
const _express = require( 'express' );
const _cors = require( 'cors' );
/*
 * Local dependencies
 */
const _LOCAL_cfg_loader = require( './docker-envs/config-loader' );

/* ----------------------------------------------------------------------------
 --
 -- LOAD THE CONFIGURATION
 --
 ---------------------------------------------------------------------------- */

var config = _LOCAL_cfg_loader.load( process.argv );

/* ----------------------------------------------------------------------------
 --
 -- INITIALIZE THE EXPRESS SERVER
 --
 ---------------------------------------------------------------------------- */

// Create the server
const app = _express( );
// Create the used CORS options.
var corsOptions = {
  origin: "*", // Accept any source for CORS requests
  methods: [ 'GET' ], // Allow only GET requests
  allowedHeaders: [ 'Origin', 'X-Requested-With', 'Content-Type', 'Accept' ], // Allow CORS related headers
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// Enable CORS for any requests
app.use( _cors( corsOptions ) );

/* ----------------------------------------------------------------------------
 --
 -- DEFINE THE ROUTES OF THE EXPRESS SERVER
 --
 ---------------------------------------------------------------------------- */

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// GET		/version
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Gets information about the current version of the API.
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get( "/version", function( req, res ){
		return res.jsonp( "Web API " + config.api.desc + " (Version " + config.api.version + ")" );
});

/* ----------------------------------------------------------------------------
 --
 -- START THE WEB API EXPRESS SERVER
 --
 ---------------------------------------------------------------------------- */

const server = app.listen( config.api.port, config.api.host, function () {
	// Read information about the started server
	var host = server.address().address;
	var port = server.address().port;
	// Display a message telling that the server started listening to requests
	console.log("Web API listening to requests at the URI http://%s:%s", host, port)
});
