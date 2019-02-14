testData = {
  SanJose: {
    getPredictions: {
      input: 'San Jose'
    },
    getListOfCityNames: {
      input: 'San Jose',
      expected: [ 'San Jose, CA, USA', 'Evergreen, CA, USA', 'East Foothills, CA, USA', 'Alum Rock, CA, USA', 'San Jose, NM, USA' ]
    },
    getCityLatLon: {
      input: 'ChIJ9T_5iuTKj4ARe3GfygqMnbk',
      expected: { lat: 37.3382082, lon: -121.8863286 }
    },
    getWeather: {
      input: { lat: 37.3382082, lon: -121.8863286 }
    },
    stringCityWeather: {
      input: 'San Jose'
    }
  },
  Mumbai: {
    getPredictions: {
      input: 'Mumbai'
    },
    getListOfCityNames: {
      input: 'Mumbai',
      expected: [ 'Mumbai, Maharashtra, India', 'Andheri, Maharashtra, India', 'Navi Mumbai, Maharashtra, India', 'Bombay, NY, USA', 'Mahul, Uttar Pradesh, India' ]
    },
    getCityLatLon: {
      input: 'ChIJwe1EZjDG5zsRaYxkjY_tpF0',
      expected: { lat: 19.0759837, lon: 72.8776559 }
    },
    getWeather: {
      input: { lat: 19.0759837, lon: 72.8776559 }
    },
    stringCityWeather: {
      input: 'Mumbai'
    }
  },
  DesMoines: {
    getPredictions: {
      input: 'Des Moines'
    },
    getListOfCityNames: {
      input: 'Des Moines',
      expected: [ 'Des Moines, IA, USA', 'Des Moines, WA, USA', 'Des Moines, NM, USA', 'Des Moines, MN, USA', 'Des Moines, MO, USA' ]
    },
    getCityLatLon: {
      input: 'ChIJ5x5hwaSZ7ocRsuSRJlEoAHE',
      expected: { lat: 41.5868353, lon: -93.6249593 }
    },
    getWeather: {
      input: { lat: 41.5868353, lon: -93.6249593 }
    },
    stringCityWeather: {
      input: 'Des Moines'
    }
  },
};

module.exports = testData;
