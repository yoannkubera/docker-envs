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
const _bodyParser = require('body-parser');
/*
 * Local dependencies
 */
const _LOCAL_cfg_loader = require( './docker-envs/config-loader' );
const _LOCAL_requests = require( './docker-envs/requests' );

/* ----------------------------------------------------------------------------
 --
 -- LOAD THE CONFIGURATION
 --
 ---------------------------------------------------------------------------- */

var config = _cfg_loader.load( process.argv );

/* ----------------------------------------------------------------------------
 --
 -- INITIALIZE THE EXPRESS SERVER
 --
 ---------------------------------------------------------------------------- */

// Create the server
const app = _express( );
// TODO: Check if better implementation by following https://expressjs.com/en/resources/middleware/cors.html
// TODO: https://www.frugalprototype.com/developpez-propre-api-node-js-express/
app.use( function(req, res, next) {
  _LOCAL_requests.headerSetting(res);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
} );
// Configure the response parser.
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

/* ----------------------------------------------------------------------------
 --
 -- DEFINE THE ROUTES OF THE EXPRESS SERVER
 --
 ---------------------------------------------------------------------------- */

var request_format;

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// GET		/version
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Gets information about the current version of the API.
request_format = "/version";
app.get( request_format, function( req, res ){
    _LOCAL_requests.headerSetting( res );
		return res.json( "Web API " + config.api.desc + " (Version " + config.api.version + ")" );
});
_LOCAL_requests.cors( app, request_format );

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
