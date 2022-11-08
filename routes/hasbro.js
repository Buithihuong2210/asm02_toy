const { Router } = require('express')
const express = require('express')
const HasbroModel = require('../models/HasbroModel')
const router = express.Router()



router.get('/main', (req, res) => {
   HasbroModel.find((err, data) => {
      if (!err) {
        //res.send(data)
        res.render('hasbro/main', { hasbro : data })
      }
    })
   })

 router.get('/drop', (req, res) => {
   HasbroModel.deleteMany({}, () => {
       console.log("Delete all data succeed !")
       res.redirect('/hasbro')
   })
})


router.get('/', (req, res) => {
  HasbroModel.find((err, data) => {
    if (!err) {
      //res.send(data)
      res.render('hasbro/index', { hasbro : data })
    }
  })
  // res.json('alooo');
})

router.get('/detail/:id', (req, res) => {
  HasbroModel.findById(req.params.id, (error, hasbro) => {
      if (!error) {


         res.render('hasbro/info', { hasbro : hasbro })  
      }
   })
})

// router.get('/api', (req, res) => {
//   StudentModel.find((err, data) => {
//     if (!err) {
//       //res.send(data)
//       //render ra trang index ở thư mục views/student
//       res.json(data)
//     }
//   })
// })

router.get('/delete/:id', (req, res) => {
  HasbroModel.findByIdAndDelete(req.params.id, (err) => {
     if (err) {
        console.log(err)
        
     } else {
        console.log("Delete hasbro succeed !");
        var message = "Delete student succeed !";
      //   redirect về trang /student (URL không phải view)
        res.redirect("/hasbro");
     }
  })
})

// //render ra form ADD
router.get('/add', (req, res) => {
       res.render("hasbro/new");

})

router.post('/add', (req, res) => {
   var hasbro = new HasbroModel(req.body)
   hasbro.save((err) => {
      if (!err) {
        console.log ("Add hasbro succeed !")
        res.redirect("/hasbro")
      }
   })
})

// //render ra form EDIT
router.get('/edit/:id', (req, res) => {
   HasbroModel.findById(req.params.id, (err, data) => {
      if (!err) {
         //render ra file: update.hbs (trong thư mục views/student)
         //gửi kèm dữ liệu của object student để load vào form edit
         //student (tên) , data (dữ liệu)
         res.render("hasbro/update", { hasbro : data })
      }
   })
})
// //nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
   var id = req.params.id;
   var hasbro = req.body;
   HasbroModel.findByIdAndUpdate(id, hasbro, (err) => {
     if (!err) {
        console.log ("Update hasbro succeed !")
        res.redirect("/hasbro")
     }
   })
})

//search function
router.post('/search', (req, res) => {
   HasbroModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
      if (!err) {
         res.render('hasbro/index', { hasbro : data})
      }
   })
})

//sort function
router.get('/sort/asc', (req, res) => {
   HasbroModel.find()
               .sort({ dom: 1})
               .exec((err, data) => {
                  if (err) {
                     // res.render('hasbro/index', { hasbro : data})
                     console.log(err)
                  }else{
                  console.log("Sort success")
                  res.redirect("/hasbro");
                  }
                  
               })
})

router.get('/sort/desc', (req, res) => {
   HasbroModel.find()
               .sort({ dom: -1})
               .exec((err, data) => {
                  if (!err) {
                     res.render('hasbro/index', { hasbro : data})
                  }
               })
})

router.get('/list', (req, res) => {
   HasbroModel.find((err, data) => {
     if (!err) {
      
       res.render('hasbro/list', { hasbro : data })
     }
   })
 })


module.exports = router
