# dwolla-technical
Technical problem for the Software Engineering internship interview process at Dwolla.
## Approach
1. Prompt the user for an input of location
2. Use the Google Maps Autocomplete API to get the 5 most likely predictions of the city based on user input
3. Prompt user to select a city from the 5 most likely predictions
4. Get latitude, longitude for the selected city (Google Maps Places API)
5. Call the OpenWeatherMap API with the latitude/longitude
6. Display the temperature
## Packages/APIs Used
- Google Maps Autocomplete API - https://developers.google.com/places/web-service/autocomplete
- Google Maps Places API - https://developers.google.com/places/web-service/place-id
- OpenWeatherMap Current API - https://openweathermap.org/current
- Inquirer - https://www.npmjs.com/package/inquirer
- Node-Fetch - https://www.npmjs.com/package/node-fetch
- Chai - https://www.npmjs.com/package/chai
- Mocha - https://www.npmjs.com/package/mocha
