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
  expect(responseZips.size).toBe(zips.length);
  zips.forEach(zip => expect(responseZips.has(zip)).toBe(true));
};
