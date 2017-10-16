const S3 = require('aws-sdk/clients/s3')
const apiVersion = '2006-03-01'
const bucketName = process.env.AWS_S3_BUCKET_NAME
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}
const S3Client = new S3({apiVersion, credentials})

function save ({key, asset}) {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: asset,
    ServerSideEncryption: 'AES256'
  }

  return new Promise((resolve, reject) => {
    S3Client.upload(params, (error, data) => error ? reject(error) : resolve(data))
  })
}

module.exports.post = function ({asset, filePath}) {
  const key = filePath
  return save({asset, key})
}
