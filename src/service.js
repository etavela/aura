build = (search, filter, configuration) => {
  findByZip = (value, filters) => {
    const searchResults = search.byIndex(search.ZIP_INDEX, value);
    return filter(searchResults, filters);
  };

  return {
    findByZip
  };
};

module.exports = {
  build
};
