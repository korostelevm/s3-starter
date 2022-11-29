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
router.get("/about", function (req, res) {
  res.send("About this wiki");
});





app.listen(3000, () => {})
