const format = require('date-fns/format')

const request = require('../../lib/request')
const S3 = require('./assets-s3')
const { promiseMap } = require('../lib')

function saveAsset ({assetType, location, person}) {
  const data = {assetType, location, person}
  const url = 'assets'
  const method = 'post'

  const options = { data, method }
  return request(url, options)
}

module.exports.post = function ({data, asset, assetType, fileName, person}) {
  const timestamp = format(new Date(), 'YYYYMMDDTHHmmssSSSZ')
  const filePath = `${person}/${assetType}/${timestamp}_${fileName}`

  data.asset = S3.post({asset, filePath})
    .then(s3Data => {
      const location = s3Data.Location
      return saveAsset({assetType, location, person})
    })

  return promiseMap(data)
}
