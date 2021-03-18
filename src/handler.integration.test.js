const { handler } = require("./index");

describe("integration tests", () => {
  test("handler should return an exact zip code match", async () => {
    const request = buildRequest("/zip", {
      value: "01001"
    });
    const response = await handler(request);
    expect(response.length).toBe(1);
    expect(response[0].zip).toBe("01001");
  });
});

buildRequest = (path, body) => {
  return {
    httpMethod: "POST",
    path: path,
    body: JSON.stringify(body)
  };
};
