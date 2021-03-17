const zipCodes = require('./data.json')

function build () {
  /**
   * Returns 
   * 
   * @param {*} value search for
   * @returns matching zip codes
   */
  function byZipCode(searchValue) {
    return zipCodes.filter(zipCode => zipCode.zip.includes(searchValue))
  }

  return {
    byZipCode
  }
}

module.exports = {
  build
}