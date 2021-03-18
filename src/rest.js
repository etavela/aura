const { BadRequstError } = require("./error");

build = service => {
  handlePost = request => {
    const body = JSON.parse(request.body);
    // Focused on making this a search service; making assumption that we do URL
    // rewriting from something like /zip-code/search/...
    if (request.path === "/zip") {
      return service.findByZip(body.value, body.filters);
    } else if (request.path === "/city") {
      return service.findByCity(body.value, body.filters);
    } else if (request.path === "/location") {
      return service.findByLocation(body.latitude, body.longitude);
    } else {
      throw new BadRequestError("Unsupported endpoint " + request.path);
    }
  };

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
