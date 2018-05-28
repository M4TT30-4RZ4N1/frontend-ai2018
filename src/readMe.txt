Lab 4 - Angular 2 - Group #5

[STRUCTURE]--------------------------------------------------------------------------------------------

Inside directoruy ./src/app it's possible to find an hierarchical structure:
    ./mock
    ./models
    ./modules
    ./services
Files are divided by type and functionalities.
The "app-module" is the Root module and the homonym component contains a title and the sub-component "app-geoMap".
Inside the directory ./modules there are 2 sub-directories:
    - components (that contains the main component of this application: "app-geoMap")
    - containers (for future usage) 
Inside the directory ./models there are the main data models.
Inside the directory  ./services there are all the services create for this client-application.
Inside the directoru ./mock there is a class Database that emulates the service provided by the REST Web Server implemented in the Lab #3.

[IMPLEMENTATION]---------------------------------------------------------------------------------------------------------------------------------------------------------

This front-end application has no authentication, it's possible to access to a web-page with:
    - a date-picker (with the date range control)
    - a map (it's possible to draw a blue polygon, not points and lines are enabled)
    - a button that ask to the service to find the number of positions
    - a card that display the number of positions found and two buttons (Cancel and Buy) 
 



