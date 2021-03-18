class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.httpStatus = 400;
  }
}

module.exports = {
  BadRequestError
};
