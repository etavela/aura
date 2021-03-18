const { BadRequestError } = require("./error");

build = configuration => {
  matchesFilters = (result, filters) => {
    const keys = Object.keys(filters);
    for (const key of keys) {
      if (!configuration.SUPPORTED_FILTERS.has(key)) {
        throw new BadRequestError("Unsupported filter " + key);
      }
      if (result[key] !== filters[key]) {
        return false;
      }
    }
    return true;
  };

  filter = (results, filters) => {
    if (!filters) {
      return results;
    }
    return results.filter(result => matchesFilters(result, filters));
  };

  return filter;
};

module.exports = {
  build
};
