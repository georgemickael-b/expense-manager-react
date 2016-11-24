var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ExpensesModel = require('../model/expenses')

router.get('/',function(req, res) {
        ExpensesModel.find({}, function (err, expenses) {
              if (err) {
                  res.status(400)
                  res.send(err)
              }
              else {
                  res.send(expenses)
              }
            });
          })
router.post('/addExpense',function(req,res){
      var title = req.body.title,
          amount = req.body.amount,
          notes = req.body.notes,
          categoriesID = req.body.categoriesID,
          date = req.body.date;
      var values = {title : title , amount :amount , categoriesID : categoriesID}
      if(notes)
        values["notes"] = notes
      if(date)
        values["date"] = date

      var newExpense = new ExpensesModel(values)
      newExpense.save(function (err) {
        if (err) {
          res.status(400)
          res.send(err);
        } else {
          res.send("done");
        }
      });
})
router.post('/deleteExpense',function(req,res){
      var id = req.body.id
      ExpensesModel.findByIdAndRemove(id,function (err) {
        if (err) {
          res.status(400)
          res.send(err);
        } else {
          res.send("done");
        }
      });
})
router.post('/updateExpense',function(req,res){
      var id = req.body.id;
      var title = req.body.title,
          amount = req.body.amount,
          notes = req.body.notes,
          categoriesID = req.body.categoriesID,
          date = req.body.date;
      var values={}
      if(notes)
        values["notes"] = notes
      if(title)
        values["title"] = title
      if(amount)
        values["amount"] = amount
      if(categoriesID)
        values["categoriesID"] = categoriesID
      if(date)
        values["date"] = date

      ExpensesModel.findByIdAndUpdate(id,values,function (err) {
        if (err) {
          res.status(400)
          res.send(err);
        } else {
          res.send("done");
        }
      });
})

module.exports = router;
