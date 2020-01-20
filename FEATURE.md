# Description of the developed feature

__Feature name:__ Fixture of the template for Apache2 client with NodeJS web API

__Feature description:__

Fixture of bugs and implementation en missing featuresof the current implementation
of the template for Express.js / MySQL / Apache2 applications:

* The API can start before the database is ready
* The Apache2 server can start before the API is ready
* The database does not initialize properly

## Feature changes in this branch

Changes:

*

Additions:

*

Bug fixes:

* Apache2 client with NodeJS web API template:

    * The MySQL container was unable to read database initialization scripts

Known issues:

* Apache2 client with NodeJS web API template:

    * The configuration does not take into account REST requests or user protected
      API calls
