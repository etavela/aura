const builder = require("./search");

describe("search", () => {
  const search = builder.build({ MIN_INDEXED_LENGTH: 3 });
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

      test("should return an empty array if search value shorter than minimum indexed length", () => {
        const result = search.byIndex(search.ZIP_INDEX, "01", false);
        expect(result.length).toBe(0);
      });

      test("should return an empty array if no matches are found", () => {
        const result = search.byIndex(search.ZIP_INDEX, "9999", false);
        expect(result.length).toBe(0);
      });
    });
    describe("on city", () => {
      test("should return an exact match on primary_city", () => {
        const result = search.byIndex(search.CITY_INDEX, "Agawam", true);
        expect(result.length).toBe(1);
        result.forEach(match => expect(match.primary_city.toBe("Agawam")));
      });

      test("should return an exact match on primary_city or acceptable_city", () => {
        const result = search.byIndex(search.CITY_INDEX, "Amherst", true);
        expect(result.length).toBe(5);
        result.forEach(match => expect(match.primary_city.toBe("Amherst")));
      });
    });
  });
});
