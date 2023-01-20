const admin = require("firebase-admin");

module.exports = async (req, res) => {
  if (!req.body.queue) {
    return res.status(422).send({ msg: "Bad input" });
  }
  try {
    return res.send({ msg: "success" });
  } catch (err) {
    return res.status(422).send({ msg: err });
  }
};
