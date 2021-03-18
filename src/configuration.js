const DEFAULT_MIN_INDEXED_LENGTH = 3;
const MIN_INDEXED_LENGTH = process.env.MIN_INDEXED_LENGTH
  ? process.env.MIN_INDEXED_LENGTH
  : DEFAULT_MIN_INDEXED_LENGTH;

const SUPPORTED_FILTERS = new Set([
  "type",
  "state",
  "county",
  "timezone",
  "area_codes"
]);

module.exports = {
  MIN_INDEXED_LENGTH: MIN_INDEXED_LENGTH
};
