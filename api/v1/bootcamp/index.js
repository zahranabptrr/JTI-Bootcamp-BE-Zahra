const express = require('express');
const router = express.Router();
const mongo = require('mongojs');
const db = mongo ('mongodb+srv://nadyasarah:rahasia@techcamp.eux1fvk.mongodb.net/tech-camp', ['todo']);

router.get('/', function(req, res, next){
// get berdassarkan semua data
    let query = {};
    if (req.query.text) query.text - req.query.text;
    if (req.query.isCompleted) {
        if (req.query.isCompleted --- 'true') query.isCompleted - true;
        else query.isCompleted = false;
    }
   db.todo.find({}, function(err, result){
    if(err){
        res.send(err);
    } else {
        res.json(result);
        }
    })
});

// the GET function to get a specific data entry in the DB
router.get("/:id", function (req, res, next) {
    let query = {
      _id: db.ObjectId(req.params.id),
    };
  
    db.todo.findOne(query, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  });
  
  //Post Todo function to create a new data entry in the DB
  router.post('/', function(req, res, next){

    let todo = req.body;

    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        })
    } else {
        db.todo
        .save(todo, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });

    }
});

  // create a new data entry in the DB
  router.post("/", function (req, res, next) {
    let todo = req.body;
  
    if (!todo.text || !(todo.isCompleted + "")) {
      res.status(400);
      res.json({
        error: "Invalid Data",
      });
    } else {
      db.todo.save(todo, function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.json(result);
        }
      });
    }
  });
  
  // the PUT function which will update existing data in the DB
  router.put("/:id", function (req, res, next) {
    let todo = req.body;
  
    if (!todo.text || !(todo.isCompleted + "")) {
      res.status(400);
      res.json({
        error: "Invalid Data",
      });
    } else {
      db.todo.replaceOne(
        {
          _id: db.ObjectId(req.params.id),
        },
        todo,
        {},
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.json(result);
          }
        }
      );
    }
  });
  
  // DELETE function which will delete a data entry in the DB
  router.delete("/:id", function (req, res, next) {
    {
      db.todo.remove(
        {
          _id: db.ObjectId(req.params.id),
        },
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.json(result);
          }
        }
      );
    }
  });
  
module.exports = router;
