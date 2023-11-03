const express = require("express");
const connection = require("../connection");
const router = express.Router();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
var fs = require("fs");
var uuid = require("uuid");
var auth = require("../services/authentication");

router.post("/generateReport", auth.authenticateToken, (req, res) => {
  const generatedUuid = uuid.v1();
  const currentDateTime = new Date();
  /*const day = currentDateTime.getDate();
  const month = currentDateTime.getMonth() + 1; // Months are zero-based, so add 1
  const year = currentDateTime.getFullYear();

  Create the formatted date string in "dd-mm-yyyy" format
  const formattedDate = `${day}-${month}-${year}`;*/
  const orderDetails = req.body;
  var productDetailsReport = JSON.parse(orderDetails.productDetails);

  var query =
    "insert into bill (uuid,name,email,mobile,paymentMethod,total,productDetails,createdBy,creationDate) values(?,?,?,?,?,?,?,?,?)";
  connection.query(
    query,
    [
      generatedUuid,
      orderDetails.name,
      orderDetails.email,
      orderDetails.mobile,
      orderDetails.paymentMethod,
      orderDetails.total,
      orderDetails.productDetails,
      res.locals.email,
      currentDateTime,
    ],
    (err, results) => {
      if (!err) {
        ejs.renderFile(
          path.join(__dirname, "", "report.ejs"),
          {
            productDetails: productDetailsReport,
            name: orderDetails.name,
            email: orderDetails.email,
            mobile: orderDetails.mobile,
            paymentMethod: orderDetails.paymentMethod,
            total: orderDetails.total,
            creationDate: orderDetails.creationDate,
          },
          (err, results) => {
            if (err) {
              return res.status(500).json(err);
            } else {
              pdf
                .create(results)
                .toFile(
                  "./generated_pdf/" + generatedUuid + ".pdf",
                  function (err, data) {
                    if (err) {
                      console.log(err);
                      return res.status(500).json(err);
                    } else {
                      return res.status(200).json({ uuid: generatedUuid });
                    }
                  }
                );
            }
          }
        );
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

router.post("/getPdf", auth.authenticateToken, function (req, res) {
  const orderDetails = req.body;
  const pdfPath = "./generated_pdf/" + orderDetails.uuid + ".pdf";
  if (fs.existsSync(pdfPath)) {
    res.contentType("application/pdf");
    fs.createReadStream(pdfPath).pipe(res);
  } else {
    var productDetailsReport = JSON.parse(orderDetails.productDetails);
    ejs.renderFile(
      path.join(__dirname, "", "report.ejs"),
      {
        productDetails: productDetailsReport,
        name: orderDetails.name,
        email: orderDetails.email,
        mobile: orderDetails.mobile,
        paymentMethod: orderDetails.paymentMethod,
        total: orderDetails.total,
      },
      (err, results) => {
        if (err) {
          return res.status(500).json(err);
        } else {
          pdf
            .create(results)
            .toFile(
              "./generated_pdf/" + orderDetails.uuid + ".pdf",
              function (err, data) {
                if (err) {
                  console.log(err);
                  return res.status(500).json(err);
                } else {
                  res.contentType("application/pdf");
                  fs.createReadStream(pdfPath).pipe(res);
                }
              }
            );
        }
      }
    );
  }
});

router.get("/getBills", auth.authenticateToken, (req, res, next) => {
  var query = "select * from bill order by id DESC";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.delete("/delete/:id", auth.authenticateToken, (req, res, next) => {
  const id = req.params.id;
  var query = "delete from bill where id=?";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: "Bill id doesn't exist" });
      }
      return res.status(200).json({ message: "Bill Deleted Successfully" });
    } else {
      return res.status(500).json(err);
    }
  });
});



module.exports = router;
