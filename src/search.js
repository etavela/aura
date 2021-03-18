const { find } = require("lodash");

const zipCodes = require("./data.json");

const ZIP_INDEX = "zip";
const CITY_INDEX = "city";

build = configuration => {
  const indexes = {
    zip: {},
    city: {}
  };

  addIndexEntry = (index, value, zipCode, exact) => {
    if (!index[value]) {
      index[value] = [];
    }
    entry = {
      zipCode,
      exact
    };
    if (!find(index[value], entry)) {
      index[value].push(entry);
    }
  };

  getParts = value => {
    const parts = new Set();
    let partLength = value.length - 1;
    while (partLength >= configuration.MIN_INDEXED_LENGTH) {
      for (
        let partIndex = 0;
        partIndex + partLength <= value.length;
        partIndex++
      ) {
        parts.add(value.substr(partIndex, partLength));
      }
      partLength--;
    }
    return Array.from(parts);
  };

  indexValue = (indexName, value, zipCode) => {
    const index = indexes[indexName];
    addIndexEntry(index, value.toLowerCase(), zipCode, true);
    const parts = getParts(value.toLowerCase());
    for (const part of parts) {
      addIndexEntry(index, part, zipCode, false);
    }
  };

  indexValues = (indexName, selector) => {
    for (const zipCode of zipCodes) {
      const values = selector(zipCode);
      for (const value of values) {
        indexValue(indexName, value, zipCode);
      }
    }
  };

  initializeIndexes = () => {
    indexValues(ZIP_INDEX, zipCode => [zipCode.zip]);
    indexValues(CITY_INDEX, zipCode => [zipCode.primary_city]);
    const acceptableCitySelector = zipCode =>
      zipCode.acceptable_cities
        ? zipCode.acceptable_cities.split(",").map(city => city.trim())
        : [];
    indexValues(CITY_INDEX, acceptableCitySelector);
  };

  initializeIndexes();

  byIndex = (indexName, searchValue, exact) => {
    const index = indexes[indexName];
    if (!index) {
      throw new Error("Invalid index name: " + indexName);
    }
    const allMatches = index[searchValue.toLowerCase()];
    if (!allMatches) {
      return [];
    } else {
      return Array.from(allMatches)
        .filter(match => !exact || match.exact)
        .map(match => match.zipCode)
        .sort((zipCode1, zipCode2) => (zipCode1.zip > zipCode2.zip ? 1 : -1));
    }
  };

  byCoordinates = (latitude, longitude) => {
    return zipCodes
      .map(zipCode => {
        return {
          zipCode,
          distance: distanceInMiles(
            zipCode.latitude,
            zipCode.longitude,
            latitude,
            longitude
          )
        };
      })
      .sort(result => result.distance);
  };

  /**
   * Shout out to https://www.geodatasource.com/developers/javascript
   */
  distanceInMiles = (lat1, lon1, lat2, lon2) => {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      return dist;
    }
  };

  return {
    byCoordinates,
    byIndex,
    ZIP_INDEX,
    CITY_INDEX
  };
};

module.exports = {
  build
};
