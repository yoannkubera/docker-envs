# Description of the developed feature

__Feature name:__ Addition of the template for Apache2 client with NodeJS web API

__Feature description:__

Adding a template supporting the development of Apache2 client interface accessing
the database through a web API written with nodeJS. It includes a docker environment
supporting the execution of the application in preconfigured docker ecosystem where
minimal configurations are required.

## Feature changes in this branch

Changes:

* Readme.md:

    * Updated the Readme.md file to include a mention to this new template
    * Included the credits into the Readme.md file

Additions:

* Apache2 client with NodeJS web API template:

    * Added the untested docker ecosystem with its configuration files
    * Added an API configuration loading library and its JSON configuration template
    * Added a javascript client configuration library and its configuration template
    * Added a basic database initialization source tree
    * Added a basic usage example with a client displaying a version provided by the API

Bug fixes:

*

Known issues:

* Apache2 client with NodeJS web API template:

    * The configuration does not take into account REST requests or user protected
      API calls
