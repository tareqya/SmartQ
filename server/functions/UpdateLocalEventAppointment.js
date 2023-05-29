const admin = require("firebase-admin");

module.exports = async (req, res) => {
  try {
    const { key, localEvent } = req.body;

    await admin
      .firestore()
      .collection("Appointments")
      .doc(key)
      .update({ localEvent });

    return res.send({ msg: "success" });
  } catch (err) {
    console.log(err);
    return res.status(422).send({ msg: "Failed to update local event!" });
  }
};
