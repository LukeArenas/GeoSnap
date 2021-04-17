const { S3 } = require('aws-sdk')
require('dotenv').config()
const { AWS_SECRET, AWS_ACCESS_KEY, AWS_REGION, AWS_BUCKET } = process.env
const s3 = new S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET,
  region: AWS_REGION
})

const upload = async (file, acl = 'public-read') => {
  try {
    const res = await s3
      .upload({
        Key: file.originalname, //Key can be a folder with a forward slash and file e.g. uuid/filename UPDATE RETURN STATEMENT AS WELL
        ACL: acl,
        Body: file.buffer,
        ContentType: file.mimetype,
        ContentLength: file.size,
        Bucket: AWS_BUCKET
      })
      .promise()
    return { image: res.Location, fileName: file.originalname } //Location is the path to where image is stored
  } catch (error) {
    throw error
  }
} //acl tells aws how to access file, file contains data from multer

const deleteImage = async (fileName) => {
  try {
    await s3.deleteObject({ Key: fileName, Bucket: AWS_BUCKET }).promise()
  } catch (error) {
    throw error
  }
}

module.exports = { upload, deleteImage }
