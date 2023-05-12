var express = require('express');
const addEmployee = require("../services/addEmployee");

var router = express.Router();

/* GET home page. */
router.post('/addEmployee', function (req, res, next) {
  const employee = req.body

  const data = addEmployee(employee)

  res.send(JSON.stringify(data))
});

module.exports = router;
