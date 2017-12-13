const Papa = require('papaparse')

Papa.asyncParse = function(file, config) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      ...config,
      complete: resolve,
      error: reject
    })
  })
}

module.exports = Papa
