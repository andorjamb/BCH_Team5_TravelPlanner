# BCH_Team5_TravelPlanner
## Travel planner MVP: Travel Planning for major cities in Finland

### Features:

* City previews, with information about major touristic attractions to help you build your itinerary
* Widget using Weather API to provide up-to-date forecast information for your trip
* API-powered Flight booking service 
* Personal profile/account page for signed-in users (Google OAuth via firebase service) in which users can keep track of their past and upcoming trips


### Planned features for future implementation:

* Destination requirements, eg vaccinations, Covid19 requirements, visa, security advice
* Localised transport assistance, eg in as provided by HSL in greater Helsinki area; links to taxi services
* Currency conversion 


### Development Notes: 

#### Additional NPM dependencies

<ul>
<li>npm install --save react-google-button : for the google button</li>
<li>npm install react-router-dom : Allow navigation between Web pages in our app</li>
<li>npm install firebase : load firebase database package</li>
</ul>

#### Running the Application

* API fetches are dependent on the backend express server. Start it first by navigating to the server folder and running: 
```npm server```
The server should be available on localhost:8080.
Then from the application root, start the client:
```npm start```

