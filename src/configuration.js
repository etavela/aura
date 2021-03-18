const DEFAULT_MIN_INDEXED_LENGTH = 3;
const MIN_INDEXED_LENGTH = process.env.MIN_INDEXED_LENGTH
  ? process.env.MIN_INDEXED_LENGTH
  : DEFAULT_MIN_INDEXED_LENGTH;

const DEFAULT_LOCATION_RESULT_LENGTH = 10;
const LOCATION_RESULT_LENGTH = process.env.DEFAULT_LOCATION_RESULT_LENGTH
  ? process.env.LOCATION_RESULT_LENGTH
  : DEFAULT_LOCATION_RESULT_LENGTH;

const SUPPORTED_FILTERS = new Set([
  "type",
  "state",
  "county",
  "timezone",
  "area_codes"
]);

module.exports = {
  LOCATION_RESULT_LENGTH,
  MIN_INDEXED_LENGTH,
  SUPPORTED_FILTERS
};
