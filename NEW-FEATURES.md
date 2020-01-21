# Feature changes since the last release
> Based on release: NONE

Changes:

* Readme.md:

    * Included the credits into the Readme.md file
    * Updated the Readme.md file to include a mention to the new template (Apache2 client with NodeJS web API)

Additions:

* Apache2 client with NodeJS web API template:

    * Added the docker ecosystem with its configuration files
    * Added an API configuration loading library and its JSON configuration template
		* Supporting CORS requests between the API and the client
    * Added a javascript client configuration library and its configuration template
    * Added a basic database initialization source tree
    * Added a basic usage example with a client displaying a version provided by the API

Bug fixes:

*

Known issues:

* Apache2 client with NodeJS web API template:

    * The configuration does not take into account REST requests or user protected
      API calls

    * The Apache2 server can start before the API is ready. This issue causes
      limited problems, since the user will probably access the apache2 server
      after the API initialized.
