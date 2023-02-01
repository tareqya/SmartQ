const admin = require("firebase-admin");

module.exports = async (req, res) => {
  if (!req.body.key || !req.body.uid || req.body.available == undefined) {
    return res.status(422).send({ msg: "Bad input" });
  }
  try {
    const { key, uid, available } = req.body;
    const appointment = await admin
      .firestore()
      .collection("Appointments")
      .doc(key)
      .get();

    if (!appointment.exists) throw `Appointment with key ${key} not found`;

    if (appointment.data().uid != uid)
      throw `Failed to remove, missmatch between given id and appointment owner id`;
    await admin
      .firestore()
      .collection("Appointments")
      .doc(key)
      .update({ available: available });
    return res.send({ msg: "success" });
  } catch (err) {
    console.log(err);
    return res.status(422).send({ msg: "Failed to remove appointment!" });
  }
};
