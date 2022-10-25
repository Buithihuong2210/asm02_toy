const { Router } = require('express')
const express = require('express')
const LegoModel = require('../models/LegoModel')
const router = express.Router()

 router.get('/drop', (req, res) => {
    LegoModel.deleteMany({}, () => {
       console.log("Delete all data succeed !")
       res.redirect('/lego')
   })
})



router.get('/', (req, res) => {
    LegoModel.find((err, data) => {
    if (!err) {
      res.render('lego/index', { lego : data })
    }
  })
  // res.json('alooo');
})

router.get('/detail/:id', (req, res) => {
    LegoModel.findById(req.params.id, (error, lego) => {
      if (!error) {
         res.render('lego/info', { lego : lego })  
      }
   })
})



router.get('/delete/:id', (req, res) => {
    LegoModel.findByIdAndDelete(req.params.id, (err) => {
     if (err) {
        console.log(err)
     } else {
        console.log("Delete lego succeed !");
        res.redirect("/lego");
     }
  })
})

// //render ra form ADD
router.get('/add', (req, res) => {
// // C1: Dùng "save"
       res.render("lego/new");
})

// //nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
   var lego = new LegoModel(req.body)
   lego.save((err) => {
      if (!err) {
        console.log ("Add lego succeed !")
        res.redirect("/lego")
      }
   })
})

// //render ra form EDIT
router.get('/edit/:id', (req, res) => {
    LegoModel.findById(req.params.id, (err, data) => {
      if (!err) {
         res.render("lego/update", { lego : data })
      }
   })
})
// //nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
   var id = req.params.id;
   var lego = req.body;
   LegoModel.findByIdAndUpdate(id, hasbro, (err) => {
     if (!err) {
        console.log ("Update lego succeed !")
        res.redirect("/lego")
     }
   })
})

//search function
router.post('/search', (req, res) => {
    LegoModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
      if (!err) {
         res.render('lego/index', { lego : data})
      }
   })
})

//sort function
router.get('/sort/asc', (req, res) => {
    LegoModel.find()
               .sort({ name: 1})
               .exec((err, data) => {
                  if (!err) {
                     res.render('lego/index', { lego : data})
                  }
               })
})

router.get('/sort/desc', (req, res) => {
    LegoModel.find()
               .sort({ name: -1})
               .exec((err, data) => {
                  if (!err) {
                     res.render('lego/index', { lego : data})
                  }
               })
})

router.get('/list', (req, res) => {
    LegoModel.find((err, data) => {
     if (!err) {
      
       res.render('lego/list', { lego : data })
     }
   })
 })


module.exports = router
