const express = require("express");
const router = express.Router();

router.get("/user/:id", (req, res) => {
  res.send(`<h1>user id : ${req.params.id}</h1>`);
});

module.exports = router;
