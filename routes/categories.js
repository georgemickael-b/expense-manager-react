var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var CategoriesModel = require('../model/categories')
var ExpensesModel = require('../model/expenses')

router.get('/',function(req, res) {
        CategoriesModel.find({}, function (err, categories) {
              if (err) {
                  res.status(400)
                  res.send(err)
              }
              else {
                  res.send(categories)
              }
            });
          });

router.post('/addCategory',function(req,res){
      var name = req.body.name;
      var newCategory = new CategoriesModel({name:name})
      newCategory.save(function (err) {
        if (err) {
          res.status(400)
          res.send(err);
        } else {
          res.send("done");
        }
      });
})

router.post('/updateCategory',function(req,res){
  var name = req.body.name;
  var id= req.body.id;
  CategoriesModel.findByIdAndUpdate(id,{name:name},function (err) {
    if (err) {
      res.status(400)
      res.send(err);
    } else {
      res.send("done");
    }
  });
})

  router.post('/deleteCategory',function(req,res){
    var id= req.body.id;
    CategoriesModel.findByIdAndRemove(id,function (err) {
      if (err) {
        res.status(400)
        res.send(err);
      } else {
        ExpensesModel.update( {}, { $pull: {categoriesID:id } } ,{multi:true} ,function(err){
          if(err){
            res.status(400)
            res.send(err);
          }else{
            res.send("done");
            }
        } )
      }
    });
})

module.exports = router;
