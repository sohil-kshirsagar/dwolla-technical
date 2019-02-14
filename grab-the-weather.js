
let inquirer = require('inquirer');
let fetch = require('node-fetch');

const owmKey = "8cd22d215d4443fdcf31053272935305";
const googleKey = "AIzaSyD5i116Q_0jd2316Fge8kGRtUC-l7tdBDs";

/*
  Ask for city name.
  Call Google Maps Autocomplete API to get list of predictions of city.
  Ask for input on which city (from predictions).
  Get latitude, longitude for selected city.
  Call OpenWeatherMap API to get weather.
  Return weather.
*/

let locationPrompt =
  {
    type: 'input',
    name: 'location',
    message: 'Where are you? Cities work best!',
    // validate will make sure the user input is not empty
    validate: function validateInput(location){
        return location !== '';
    }
  };

async function getPredictions(input) {
  /*
  Parameter: user's text input to "Where are you?"
  Uses the Google Autocomplete API
  Returns: a list of 5 most likely cities (objects) based on text input
  */
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?&types=(cities)&key=' + googleKey;
  let requestUrl = baseUrl + "&types=(cities)&input=" + input;
  let response = await fetch(requestUrl);
  if (!response.ok) {
    throw "There was an error while calling the Google Autocomplete API.";
  }
  let json = await response.json();
  let predictions = await json['predictions'];
  return predictions;
};

function getListOfCityNames(predictions) {
  /*
  Parameter: list of objects of Cities
  Returns: list of names of cities (used to display city names for user to select which matches initial input best)
  */
  let choices = [];
  for (let i = 0; i < predictions.length; i++) {
    choices.push(predictions[i]['description']);
  }
  return choices;
};

let cityFromPredictionsPrompt =
  {
    type: 'list',
    name: 'city',
    message: 'Please select a city from below.',
    choices: []
  };

async function getCityLatLon(input) {
  /*
  Parameter: Place ID of city that user selected
  Uses Google Places API to get more information about the city
  Returns: dictionary containing latitude and longitude of the city
  */

  const baseUrl = 'https://maps.googleapis.com/maps/api/place/details/json?key=' + googleKey;
  let requestUrl = baseUrl + "&placeid=" + input;
  let response = await fetch(requestUrl);
  if (!response.ok) {
    throw "There was an error while calling the Google Places API.";
  }
  let json = await response.json();
  let latLon = {};
  latLon['lat'] = await json['result']['geometry']['location']['lat'];
  latLon['lon'] = await json['result']['geometry']['location']['lng'];
  return latLon;
};

async function getWeather(input) {
  /*
  Parameter: dictionary containing latitude and longitude of the city
  Uses OpenWeatherMap API
  Returns: Current temperature of city
  */
  const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=' + owmKey;
  let requestUrl = baseUrl + '&lat=' + input['lat'].toString() + '&lon=' + input['lon'].toString();
  let response = await fetch(requestUrl);
  if (!response.ok) {
    throw "There was an error while calling the OpenWeatherMap API.";
  }
  let json = await response.json();
  let tempF = await json['main']['temp'];
  return tempF;
};

function stringCityWeather(city, tempF) {
  /*
  Parameters: city name and current temperature in that cityInfo
  Returns string  of city name and current temperature in readable format
  */
  return city + ' weather:\n' + Math.round(tempF) + " degrees Fahrenheit";
};

async function grabTheWeatherMain() {
  try {
    console.log('Hi, welcome to grabbing the weather.');

    let userInputCityText = await inquirer.prompt(locationPrompt);
    // Prompt user to enter text on where they are
    let input = userInputCityText['location'];

    let predictions = await getPredictions(input);
    let choices = getListOfCityNames(predictions);

    cityFromPredictionsPrompt['choices'] = choices;

    userInputCitySelection = await inquirer.prompt(cityFromPredictionsPrompt)
    // Prompt user to select a city (from a list of predictions)
    let city = userInputCitySelection['city'];

    let cityInfo = predictions[choices.indexOf(city)];

    let latLon = await getCityLatLon(cityInfo['place_id']);
    let tempF = await getWeather(latLon);

    console.log(stringCityWeather(city, tempF));

  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getPredictions: getPredictions,
  getListOfCityNames: getListOfCityNames,
  getCityLatLon: getCityLatLon,
  getWeather: getWeather,
  stringCityWeather: stringCityWeather,
  grabTheWeatherMain: grabTheWeatherMain
};
