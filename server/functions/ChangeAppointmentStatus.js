const admin = require("firebase-admin");
const NotifyClients = require("./NotifyClients");

module.exports = async (req, res) => {
  if (
    !req.body.key ||
    !req.body.uid ||
    req.body.available == undefined ||
    req.body.kid == undefined
  ) {
    return res.status(422).send({ msg: "Bad input" });
  }
  try {
    const { key, uid, available, kid } = req.body;
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

    // send notification only when appointment removed
    if (available == true) {
      NotifyClients(appointment.data().time, uid, kid);
      await admin
        .firestore()
        .collection("Appointments")
        .doc(key)
        .update({ localEvent: "" });
    }
    return res.send({ msg: "success" });
  } catch (err) {
    console.log(err);
    return res.status(422).send({ msg: "Failed to remove appointment!" });
  }
};
