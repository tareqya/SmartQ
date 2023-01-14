const admin = require("firebase-admin");

module.exports = async (req, res) => {
  if (!req.body.date || !req.body.uid) {
    return res.status(422).send({ msg: "Bad input" });
  }
  try {
    return res.send({ queues: [] });
  } catch (err) {
    return res.status(422).send({ msg: err, queues: [] });
  }
};
