const zipCodes = require("./data.json");

const ZIP_INDEX = "zip";
const CITY_INDEX = "city";

function build() {
  const indexes = {
    zip: {},
    city: {}
  };

  initializeIndexes();

  function initializeIndexes() {
    indexValues(ZIP_INDEX, zipCode => [zipCode.zip]);
    indexValues(CITY_INDEX, zipCode => [zipCode.primary_city]);
    const acceptableCitySelector = zipCode => 
      zipCode.acceptable_cities
      ? zipCode.acceptable_cities.split(",").map(city => city.trim())
      : [];
    indexValues(CITY_INDEX, acceptableCitySelector);
  }

  function indexValues(indexName, selector) {
    for (const zipCode of zipCodes) {
      const values = selector(zipCode);
      for (const value of values) {
        indexValue(indexName, value, zipCode, true);
      }
    }
  }

  function indexValue(indexName, value, zipCode, exact) {
    const index = indexes[indexName];
    if (!index[value]) {
      index[value] = [];
    }
    index[value].push({
      zipCode,
      exact
    });
  }

  function byCoordinates(latitude, longitude, numberOfResults) {
    // return zipCodes.filter(zipCode => zipCode.zip.includes(searchValue))
  }

  function byIndex(indexName, searchValue, exact) {
    const index = indexes[indexName];
    if (!index) {
      throw new Error("Invalid index name: " + indexName);
    }
    if (exact) {
      return getExactMatches(index, searchValue);
    } else {
      return getPartialMatches(index, searchValue);
    }

    function getExactMatches(index, searchValue) {
      const matches = index[searchValue];
      return matches
        ? matches.filter(match => match.exact).map(match => match.zipCode)
        : [];
    }

    function getPartialMatches(index, searchValue) {
      let matches = index[searchValue];
      if (!matches) {
        matches = indexPartialMatches();
      }
      return matches.map(match => match.zipCode);

      function indexPartialMatches() {
        const exactMatchKeys = Object.keys(index).filter(
          key => index[key].exact
        );
        const partialMatches = [];
        for (const key of exactMatchKeys) {
          if (key.includes(searchValue)) {
            const currentPartialMatches = index[key].map(entry => {
              return { zipCode: entry.zipCode, exact: false };
            });
            partialMatches.push(...currentPartialMatches);
          }
        }
        index[searchValue] = partialMatches;
        return partialMatches;
      }
    }
  }

  return {
    byCoordinates,
    byIndex,
    ZIP_INDEX,
    CITY_INDEX
  };
}

module.exports = {
  build
};
