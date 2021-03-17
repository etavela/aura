const zipCodes = require("./data.json");

const ZIP_INDEX = "zip";
const CITY_INDEX = "city";

build = configuration => {
  const indexes = {
    zip: {},
    city: {}
  };

  initializeIndexes();

  initializeIndexes = () => {
    indexValues(ZIP_INDEX, zipCode => [zipCode.zip]);
    indexValues(CITY_INDEX, zipCode => [zipCode.primary_city]);
    const acceptableCitySelector = zipCode =>
      zipCode.acceptable_cities
        ? zipCode.acceptable_cities.split(",").map(city => city.trim())
        : [];
    indexValues(CITY_INDEX, acceptableCitySelector);
  };

  indexValues = (indexName, selector) => {
    for (const zipCode of zipCodes) {
      const values = selector(zipCode);
      for (const value of values) {
        indexValue(indexName, value, zipCode);
      }
    }
  };

  indexValue = (indexName, value, zipCode) => {
    const index = indexes[indexName];
    addIndexEntry(index, value, zipCode, true);
    const parts = getParts(value);
    for (const part of parts) {
      addIndexEntry(index, part, zipCode, false);
    }
  };

  getParts = value => {
    const parts = [];
    let partLength = value.length - 1;
    while (partLength >= configuration.MIN_INDEXED_LENGTH) {
      for (
        let partIndex = 0;
        partIndex + partLength <= value.length;
        partIndex++
      ) {
        parts.push(value.substr(partIndex, partLength));
      }
      partLength--;
    }
    return parts;
  };

  addIndexEntry = (index, value, zipCode, exact) => {
    if (!index[value]) {
      index[value] = [];
    }
    index[value].push({
      zipCode,
      exact
    });
  };

  function byCoordinates(latitude, longitude, numberOfResults) {
    // return zipCodes.filter(zipCode => zipCode.zip.includes(searchValue))
  }

  function byIndex(indexName, searchValue, exact) {
    const index = indexes[indexName];
    if (!index) {
      throw new Error("Invalid index name: " + indexName);
    }
    const allMatches = index[searchValue];
    if (!allMatches) {
      return [];
    } else {
      return allMatches
        .filter(match => !exact || match.exact)
        .map(match => match.zipCode);
    }
  }

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
