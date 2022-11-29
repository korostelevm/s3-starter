const express = require('express')
const path = require("path");
const app = express()
const router = express.Router();
app.use(router)

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false
}
app.use(express.static('public', options))


// About page route.


const { createPresignedPost } = require("@aws-sdk/s3-presigned-post");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client } = require("@aws-sdk/client-s3");


const client = new S3Client({ region: "us-west-2" });
const Bucket = "cyclic-fair-ruby-clam-cuff-us-east-1";
const Key = "user/eric/1";
const Fields = {
  acl: "public-read",
};


const REGION = "us-east-1";
const s3Client = new S3Client({ region: REGION });

router.post("/presigned", async (req, res)=> {

    const { url, fields } = await createPresignedPost(client, {
        Bucket,
        Key,
      });
      
  res.json({
    url, fields
  });
});





app.listen(3000, () => {})
