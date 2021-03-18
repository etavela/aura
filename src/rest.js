const { BadRequestError } = require("./error");

build = service => {
  handlePost = request => {
    const body = JSON.parse(request.body);
    // Focused on making this endpoint a search service only
    // Making assumption that we do URL rewriting from something like /zip-code/search/...
    if (request.path === "/zip") {
      return service.findByZip(body.value, body.filters);
    } else if (request.path === "/city") {
      return service.findByCity(body.value, body.filters);
    } else if (request.path === "/location") {
      return service.findByLocation(
        body.latitude,
        body.longitude,
        body.filters
      );
    } else {
      throw new BadRequestError("Unsupported endpoint " + request.path);
    }
  };

  /**
   * Fulfills valid zip code REST requests
   *
   * @param {Object} request the HTTP search request
   * @returns {Array} matching zip code data
   */
  handleRequest = request => {
    if (request.httpMethod.toUpperCase() === "POST") {
      return handlePost(request);
    } else {
      throw new BadRequestError("Endpoint only supports POST HTTP method");
    }
  };

  return {
    handleRequest
  };
};

module.exports = {
  build
};
