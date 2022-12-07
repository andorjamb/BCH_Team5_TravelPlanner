# BCH_Team5_TravelPlanner
## Travel planner MVP: Travel Planning for major cities in Finland
A Single-Page Application built with Reactjs and Firebase Firestore.

### Features:

* City previews, with information about major touristic attractions to help you build your itinerary
* Weather API data to provide up-to-date forecast information for your trip
* Personal profile/account page for signed-in users (Google OAuth via firebase service) in which users can keep track of their past and upcoming trips


### Planned features for future implementation:

* Destination requirements, eg vaccinations, Covid19 requirements, visa, security advice
* Localised transport assistance, eg in as provided by HSL in greater Helsinki area; links to taxi services
* Currency conversion 
* API-powered Flight booking service 


### Development Notes: 

#### Additional NPM dependencies

Run npm install to ensure the following dependencies are installed:

* Google SignIn Button: npm install --save react-google-button
* React Router: npm install react-router-dom
* Firebase package: npm install firebase
* npm install axios

#### Environment Variables for API keys

Generate your own API keys for the following services:
* Open weather API 
* Google Places / Google Maps API

Save the keys to an .env file at the project root as follows:

REACT_APP_OPENWEATHER_API_KEY:your key
REACT_APP_GOOGLEMAPS_API_KEY: your key




