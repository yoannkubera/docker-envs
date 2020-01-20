/*==============================================================================
 *
 * Configuration of the interaction between the client interface and the web API.
 *
 ==============================================================================*/

var config = {
	 api: {
     /* Either true (if the web API is accessed over HTTPS) or false (if over HTTP) */
		 https: @@API_HTTPS@@,
     /* The host where the web API resides */
  	 host: "@@API_HOST@@",
     /* The port through which the web API is accessed.
        Can be omitted or left empty if the default port is used. */
  	 port: @@API_PORT@@,
     /* The path starting from the root of the host granting access to the base
        directory of the API.
				The path should neither start nor end with '/'.
				Can be omitted or left empty if the path is the root. */
     path: "@@API_PATH@@"
	 }
};
