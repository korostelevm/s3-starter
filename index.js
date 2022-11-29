const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();
app.use(express.json()); 

app.use(router);

var options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html", "css", "js", "ico", "jpg", "jpeg", "png", "svg"],
  index: ["index.html"],
  maxAge: "1m",
  redirect: false,
};
app.use(express.static("public", options));

// About page route.

const { createPresignedPost } = require("@aws-sdk/s3-presigned-post");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, ListObjectsCommand } = require("@aws-sdk/client-s3");

const BUCKET_NAME = "cyclic-fair-ruby-clam-cuff-us-east-1";
const Fields = {
  acl: "public-read",
};

const REGION = "us-east-1";
const s3 = new S3Client({ region: REGION });

router.post("/presigned", async (req, res) => {
    const file_name = req.body.file_name
    const { url, fields } = await createPresignedPost(s3, {
        Bucket: BUCKET_NAME,
        Key: `uploads/${file_name}`,
    });

  return res.json({
    url,
    fields,
  });
}); 

router.get("/list_uploads", async (req, res) => {
    let bucket_data = await s3.send(new ListObjectsCommand({
        Bucket: BUCKET_NAME,
        Prefix: 'uploads'
    }));
    let bucket_contents = bucket_data.Contents
    return res.json(bucket_contents);
});

app.listen(3000, () => {});
