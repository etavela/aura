build = (search, filter, configuration) => {
  findByCity = (value, filters) => {
    const searchResults = search.byIndex(search.CITY_INDEX, value);
    return filter(searchResults, filters);
  };

  findByZip = (value, filters) => {
    const searchResults = search.byIndex(search.ZIP_INDEX, value);
    return filter(searchResults, filters);
  };

  return {
    findByCity,
    findByZip
  };
};

module.exports = {
  build
};
