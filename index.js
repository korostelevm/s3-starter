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

// cyclic-fair-ruby-clam-cuff-us-east-1

// About page route.


let {S3Client} = require("@aws-sdk/client-s3")
let { getSignedUrl } = require("@aws-sdk/s3-request-presigner")

const REGION = "us-east-1";
const s3Client = new S3Client({ region: REGION });


router.get("/about", function (req, res) {
  res.send("About this wiki");
});





app.listen(3000, () => {})
