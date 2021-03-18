build = (search, filter, configuration) => {
  findByCity = (value, filters) => {
    const searchResults = search.byIndex(search.CITY_INDEX, value);
    return filter(searchResults, filters);
  };

  findByLocation = (latitude, longitude, filters) => {
    const searchResults = search.byCoordinates(latitude, longitude);
    return filter(searchResults, filters).slice(
      0,
      configuration.LOCATION_RESULT_LENGTH
    );
  };

  findByZip = (value, filters) => {
    const searchResults = search.byIndex(search.ZIP_INDEX, value);
    return filter(searchResults, filters);
  };

  return {
    findByCity,
    findByLocation,
    findByZip
  };
};

module.exports = {
  build
};
