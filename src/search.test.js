const { handler } = require("./index");
const builder = require("./search");

describe("search", () => {
  const search = builder.build({MINIMUM_INDEXED_LENGTH: 3});
  describe("byIndex()", () => {
    describe("on zip code", () => {
      test("should return an exact match", () => {
        const result = search.byIndex(search.ZIP_INDEX, "01002", true);
        expect(result.length).toBe(1);
        const match = result[0];
        expect(match.zip).toBe("01002");
      });

      test("should return partial match results", () => {
        const result = search.byIndex(search.ZIP_INDEX, "0100", false);
        expect(result.length).toBe(8);
        result.forEach(match => expect(match.zip.includes("0100")));
      });

      test("should return an empty array if no matches are found", () => {
        const result = search.byIndex(search.ZIP_INDEX, "9999", false);
        expect(result.length).toBe(0);
      });
    });
  });
});
