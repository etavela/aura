const { BadRequestError } = require("./error");
const { handler } = require("./index");

describe("integration tests", () => {
  test("handler should return an exact zip code match", async () => {
    const request = buildRequest("/zip", {
      value: "01001"
    });
    const response = await handler(request);
    checkForZips(response, "01001");
  });

  test("handler should return multiple city name matches", async () => {
    const request = buildRequest("/city", {
      value: "cush"
    });
    const response = await handler(request);
    checkForZips(response, "01002", "02743", "02745", "04109", "04563");
  });

  test("handler should return filtered multiple city name matches", async () => {
    const request = buildRequest("/city", {
      value: "cush",
      filters: {
        state: "MA"
      }
    });
    const response = await handler(request);
    checkForZips(response, "01002", "02743", "02745");
  });

  test("handler should return location matches", async () => {
    const request = buildRequest("/location", {
      latitude: 42.136749, // Charlton, MA
      longitude: -71.969978
    });
    const response = await handler(request);
    checkForZips(
      response,
      "01507",
      "01508",
      "01509",
      "01515",
      "01537",
      "01540",
      "01542",
      "01550",
      "01566",
      "01571"
    );
  });

  test("handler should throw a BadRequestError for a bad request", async () => {
    const request = buildRequest("/no_endpoint", {});
    await expect(handler(request)).rejects.toThrow(BadRequestError);
  });

});

buildRequest = (path, body) => {
  return {
    httpMethod: "POST",
    path: path,
    body: JSON.stringify(body)
  };
};

checkForZips = (response, ...zips) => {
  const responseZips = new Set(response.map(result => result.zip));
  console.log(Array.from(responseZips).sort());
  expect(responseZips.size).toBe(zips.length);
  zips.forEach(zip => expect(responseZips.has(zip)).toBe(true));
};
