const express = require("express");
const connection = require("../connection");
const router = express.Router();
var auth = require("../services/authentication");

router.get("/details", auth.authenticateToken, (req, res, next) => {
  var candidateCount;
  var courseCount;
  var billCount;
  var query = "select count(course_id) as courseCount from course_master";
  connection.query(query, (err, results) => {
    if (!err) {
      courseCount = results[0].courseCount;
    } else {
      return res.status(500).json(err);
    }
  });

  var query = "select count(student_id) as signupCount from student";
  connection.query(query, (err, results) => {
    if (!err) {
      candidateCount = results[0].signupCount - 1;
    } else {
      return res.status(500).json(err);
    }
  });

  var query = "select count(id) as billCount from bill";
  connection.query(query, (err, results) => {
    if (!err) {
      billCount = results[0].billCount;
      var data = {
        candidate: candidateCount,
        course: courseCount,
        bill: billCount,
      };
      return res.status(200).json(data);
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
