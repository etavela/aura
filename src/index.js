const configuration = require("./configuration");
const restBuilder = require("./rest");
const serviceBuilder = require("./service");
const searchBuilder = require("./search");

let rest;

// lambda-like handler function
module.exports.handler = async event => {
  if (!rest) {
    initializeRest();
  }
  return rest.handle(event);
};

initializeRest = () => {
  const search = searchBuilder.build(configuration);
  const filter = filterBuilder.build(configuration);
  const service = serviceBuilder.build(search, filter);
  rest = restBuilder(service);
};
