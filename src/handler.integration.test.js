const { handler } = require("./index");

describe("integration tests", () => {
  test("handler function exists", () => {
    expect(typeof handler).toBe("function");
  });
});
