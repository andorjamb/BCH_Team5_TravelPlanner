# React City Trip Planner

This is a ReactJS-based application built with Firebase Firestore that allows you to plan your city trips. The app provides users with previews of cities, along with information about major tourist attractions to help you build your itinerary. It also includes Weather API data to provide up-to-date forecast information for your trip. 

The app offers a personal profile/account page for signed-in users, which uses Google OAuth via Firebase service. Here, users can keep track of their past and upcoming trips.

In addition to trip planning, the app provides other useful features such as destination requirements, including vaccinations, Covid19 requirements, visa, and security advice. It also offers localized transport assistance, such as in the Greater Helsinki area, with links to taxi services. For convenience, the app includes a currency conversion feature.

Furthermore, the app includes an API-powered flight booking service. With this feature, users can book their flights directly from the app, making the trip planning process much more seamless.

## Key Features

- City previews with information about major touristic attractions to help you build your itinerary
- Weather API data to provide up-to-date forecast information for your trip
- Personal profile/account page for signed-in users (Google OAuth via Firebase service) in which users can keep track of their past and upcoming trips
- Destination requirements, including vaccinations, Covid19 requirements, visa, and security advice
- Localised transport assistance, such as in the Greater Helsinki area, with links to taxi services
- Currency conversion 
- API-powered flight booking service

## Getting Started

To get started with this application, simply clone the repository and run `npm install` to install the dependencies. You will need to create a Firebase account and Firestore database to use the app's authentication and database functionalities. 

Once you have created the necessary Firebase account and database, create a `.env` file in the root directory and add your Firebase configuration information as shown below:


```code
REACT_APP_API_KEY=[YOUR_API_KEY]
REACT_APP_AUTH_DOMAIN=[YOUR_AUTH_DOMAIN]
REACT_APP_DATABASE_URL=[YOUR_DATABASE_URL]
REACT_APP_PROJECT_ID=[YOUR_PROJECT_ID]
REACT_APP_STORAGE_BUCKET=[YOUR_STORAGE_BUCKET]
REACT_APP_MESSAGING_SENDER_ID=[YOUR_MESSAGING_SENDER_ID]
REACT_APP_APP_ID=[YOUR_APP_ID]
```

After adding your Firebase configuration information, run `npm start` to start the application.

## Contributing

If you would like to contribute to this project, feel free to submit a pull request. 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
