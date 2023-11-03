const express = require("express");
const connection = require("../connection");
const router = express.Router();
var auth = require("../services/authentication");
var checkRole = require("../services/checkRole");

router.post("/add", auth.authenticateToken, checkRole.checkRole, (req, res) => {
  let product = req.body;
  var query =
    "insert into course_master (course_name,description,course_fee,status) values(?,?,?,'true')";
  connection.query(
    query,
    [product.course_name, product.description, product.course_fee],
    (err, results) => {
      if (!err) {
        return res.status(200).json({ message: "Course added Successfully" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

router.get("/get", auth.authenticateToken, (req, res) => {
  var query = "select * from course_master";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/getById/:id", auth.authenticateToken, (req, res, next) => {
  const id = req.params.id;
  var query = "select * from course_master where course_id=?";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.patch(
  "/update",
  auth.authenticateToken,
  checkRole.checkRole,
  (req, res, next) => {
    let product = req.body;
    var query =
      "update course_master set course_name=?,description=?,course_fee=?,status=? where course_id=?";
    connection.query(
      query,
      [
        product.course_name,
        product.description,
        product.course_fee,
        product.status,
        product.course_id,
      ],
      (err, results) => {
        if (!err) {
          if (results.affectedRows == 0) {
            return res.status(404).json({ message: "Incorrect Course_id" });
          } else {
            return res
              .status(200)
              .json({ message: "Course Updated Succesfully" });
          }
        } else {
          return res.status(500).json(err);
        }
      }
    );
  }
);

router.patch(
  "/updateStatus",
  auth.authenticateToken,
  checkRole.checkRole,
  (req, res, next) => {
    let product = req.body;
    var query = "update course_master set status=? where course_id=?";
    connection.query(query, [product.status, product.id], (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "Incorrect Course_id" });
        } else {
          return res
            .status(200)
            .json({ message: "Course Updated Succesfully" });
        }
      } else {
        return res.status(500).json(err);
      }
    });
  }
);

router.delete(
  "/delete/:id",
  auth.authenticateToken,
  checkRole.checkRole,
  (req, res, next) => {
    const id = req.params.id;
    var query = "delete from course_master where course_id=?";
    connection.query(query, [id], (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "Incorrect Course_id" });
        }
        return res.status(200).json({ message: "Course Deleted Successfully" });
      } else {
        return res.status(500).json(err);
      }
    });
  }
);

module.exports = router;
