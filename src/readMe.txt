Lab 5 - Angular 2 - Group #5

[START THE APPLICATION]--------------------------------------------------------------------------------------------

1) Open a command shell inside the main directory of the project and run:

	> docker-compose up

This will start the REST Server on http://localhost:8080/


2) Open visual studio code or a command shell inside the directory of the project and run:

	> npm install
	> npm start

The client-application will start on http://localhost:4200/.

[CREDENTIALS]--------------------------------------------------------------------------------------------

The application first load a login page in case the applicant is not logged in yet.
There can be 3 different possibilities on login:

	- { username: testadmin , password: testpassword}
	- { username: testcustomer , password: testpassword}
	- { username: testuser , password: testpassword}

[STRUCTURE]--------------------------------------------------------------------------------------------

Each different role is enabled to view an Home Page with a simple welcome message and a dashBoard that help to navigate.
There are different contents based on the roles:

	- ADMIN: can see both user both customer data;
	- CUSTOMER: can access to a page with a simple map, draw a polygon and retrieve the positions inside it, then he's able to decide to buy or not them;
	- USER: can add positions on map in order to insert them in the remote database or can ask about positions registered with a certain criteria;

[IMPLEMENTATION]---------------------------------------------------------------------------------------------------------------------------------------------------------

The authentication is managed by a JWT (Json Web Token).
The token is retrieved after the login procedure end with success (the REST Server erogate a jwt if the credentials are correct) and
it's stored inside the localStorage.
It's possible in general to store the jwt inside a cookie or inside the localStorage (we suppose we will use HTTPS):
	
	- cookie: 	when used with the HttpOnly cookie flag are are immune to XSS but are not accessible through JavaScript, 
		  	it's possible to set the Secure cookie flag to guarantee the cookie is only sent over HTTPS.
			Modern developers are hesitant to use cookies because they traditionally required state to be stored on the server, thus breaking RESTful best practices.
			Cookies as a storage mechanism do not require state to be stored on the server if you are storing a JWT in the cookie.
			However, cookies are vulnerable to a different type of attack: cross-site request forgery (CSRF).

	- localStorage: is accessible through JavaScript on the same domain and because of this can be vulnerable to cross-site scripting (XSS) attacks.
			As a storage mechanism, Web Storage does not enforce any secure standards during transfer. 
			Whoever reads Web Storage and uses it must do their due diligence to ensure they always send the JWT over HTTPS and never HTTP.
			Angular sanitizes and escapes untrusted values (Sanitization is the inspection of an untrusted value, turning it into a value that�s safe to insert into the DOM),
			so the framework protect the applicatio from XSS attacks.
			
	--> Our team has chosen the localStorage method to store the jwt.

The permission policy is implemented server side, so all checks are done by the REST Server.
In this Single Page Application permissions are implemented only with the purpose to show or hide some content with the library 'ngx-permissions' (it's not a security asset).
The main 3 roles are: 'ROLE_ADMIN', 'ROLE_CUSTOMER' and 'ROLE_USER'.


 



