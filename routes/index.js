var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  //render ra trang index ở trong thư mục views
  res.render('index')
})

module.exports = router;
