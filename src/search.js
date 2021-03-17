const zipCodes = require('./data.json')

function build () {

  function byCoordinates (latitude, longitude, numberOfResults) {
    return zipCodes.filter(zipCode => zipCode.zip.includes(searchValue))
  }

  function byZipCode (searchValue) {
    return zipCodes.filter(zipCode => zipCode.zip.includes(searchValue))
  }

  return {
    byCoordinates,
    byZipCode
  }
}

module.exports = {
  build
}