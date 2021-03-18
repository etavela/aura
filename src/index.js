const configuration = require("./configuration");
const restBuilder = require("./rest");
const serviceBuilder = require("./service");
const searchBuilder = require("./search");
const filterBuilder = require("./filter");

let rest;

// lambda-like handler function
module.exports.handler = async event => {
  if (!rest) {
    initializeRest();
  }
  return rest.handleRequest(event);
};

initializeRest = () => {
  const search = searchBuilder.build(configuration);
  const filter = filterBuilder.build(configuration);
  const service = serviceBuilder.build(search, filter, configuration);
  rest = restBuilder.build(service);
};
