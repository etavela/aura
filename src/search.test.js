const { handler } = require("./index");
const builder = require("./search")

describe("search", () => {
  const search = builder.build()
  describe("byZipCode", () => {
    test("should return an exact match", () => {
      const result = search.byZipCode("01002")
      expect(result.length).toBe(1);
      const match = result[0]
      expect(match.zip).toBe("01002")
    });  

    test("should return partial matches", () => {
      const result = search.byZipCode("0100")
      expect(result.length).toBe(8);
      result.forEach(match => expect(match.zip.includes("0100")))
    });  
  })
});
