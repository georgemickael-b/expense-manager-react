var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ExpensesModel = require('../model/expenses')

router.post('/',function(req, res) {
        var startDate = new Date(req.body.startDate),
            endDate = new Date(req.body.endDate)
        ExpensesModel.find({ date: { $gte: startDate, $lte: endDate }}, function (err, expenses) {
              if (err) {
                  res.status(400)
                  console.log(err)
                  res.send(err)
              }
              else {
                  res.send(expenses)
              }
            });
          })
router.post('/daily',function(req,res){
    var startDate = new Date(req.body.startDate),
        endDate = new Date(req.body.endDate)
    ExpensesModel.aggregate([
        {$match: { date : { $gte: startDate,$lte:endDate } } },
        {$unwind: "$categoriesID" },
        {$group: { _id: {categoryID:"$categoriesID" , date : "$date" } , total: { $sum: "$amount" } }}
      ],function(err,expenses){
        if (err) {
            res.status(400)
            console.log(err)
            res.send(err)
        }
        else {
            res.send(expenses)
        }
      })
    })
router.post('/monthly',function(req,res){
    var year= req.body.year
    ExpensesModel.aggregate([
        {$project:{year :{ $year: "$date" },categoriesID:"$categoriesID",amount:"$amount",date:"$date"}},
        {$match: { year : year } },
        {$unwind: "$categoriesID" },
        {$group: { _id: {categoryID:"$categoriesID" , month : { $month : "$date"} } ,
          total: { $sum: "$amount" } }}
      ],function(err,expenses){
        if (err) {
            res.status(400)
            console.log(err)
            res.send(err)
        }
        else {
            res.send(expenses)
        }
      })
    })
router.post('/weekly',function(req,res){
    var month= req.body.month
    var year= req.body.year
    ExpensesModel.aggregate([
        {$project:{month :{ $month: "$date" },year:{$year :"$date"},categoriesID:"$categoriesID",
              amount:"$amount",date:"$date"}},
        {$match: { month : month ,year :year} },
        {$unwind: "$categoriesID" },
        {$group: { _id: {categoryID:"$categoriesID" , week : { $week : "$date"} } ,
          total: { $sum: "$amount" } }}
      ],function(err,expenses){
        if (err) {
            res.status(400)
            console.log(err)
            res.send(err)
        }
        else {
            res.send(expenses)
        }
      })
    })
router.post('/addExpense',function(req,res){
      var title = req.body.title,
          amount = req.body.amount,
          notes = req.body.notes,
          categoriesID = req.body.categoriesID,
          date = new Date(req.body.date);
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
          date = new Date(req.body.date);

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
