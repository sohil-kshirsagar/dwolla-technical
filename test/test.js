let expect = require('chai').expect;
testFns = require('../grab-the-weather.js');
testData = require('./testData.js')

describe('getPredictions', function () {
  it('Should return a list of 5 most likely cities (objects) based on text input', async function () {
    var predictions;
    for (var testCity in testData) {
      predictions = await testFns.getPredictions(testData[testCity].getPredictions.input);
      expect(predictions.length).to.be.equal(testData[testCity].getPredictions.expected);
    }
  });
});

describe('getListOfCityNames', function () {
  it('Should return list of names of cities extracted from list of city objects', async function () {
    var predictions;
    var choices;
    for (var testCity in testData) {
      predictions = await testFns.getPredictions(testData[testCity].getPredictions.input);
      choices = testFns.getListOfCityNames(predictions);
      expect(choices).to.deep.equal(testData[testCity].getListOfCityNames.expected);
    }
  });
});

describe('getCityLatLon', function () {
  it('Should return a dictionary containing latitude and longitude given city', async function () {
    var latLon;
    for (var testCity in testData) {
      latLon = await testFns.getCityLatLon(testData[testCity].getCityLatLon.input);
      expect(latLon).to.deep.equal(testData[testCity].getCityLatLon.expected);
    }
  });
});

describe('getWeather', function () {
  it('Should return current temperature of a city given latitude/longitude', async function () {
    var tempF;
    for (var testCity in testData) {
      tempF = await testFns.getWeather(testData[testCity].getWeather.input);
      expect(tempF).to.be.a('number');
    }
  });
});

describe('stringCityWeather', function () {
  it('Should return string of city name and current temperature', async function () {
    var tempF;
    var finalOutput;
    for (var testCity in testData) {
      tempF = await testFns.getWeather(testData[testCity].getWeather.input);
      finalOutput = testFns.stringCityWeather(testData[testCity].stringCityWeather.input);
      expect(finalOutput).to.be.a('string').that.includes('degrees Fahrenheit');
    }
  });
});
