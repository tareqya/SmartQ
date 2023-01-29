const admin = require("firebase-admin");

module.exports = async (req, res) => {
  if (!req.body.oldKey || !req.body.uid || !req.body.newKey) {
    return res.status(422).send({ msg: "Bad input" });
  }
  try {
    const { oldKey, newKey, uid } = req.body;
    const oldAppointment = await admin
      .firestore()
      .collection("Appointments")
      .doc(oldKey)
      .get();

    const newAppointment = await admin
      .firestore()
      .collection("Appointments")
      .doc(newKey)
      .get();
    if (!oldAppointment.exists)
      throw `Old appointment with key ${oldKey} not found`;

    if (!newAppointment.exists)
      throw `New appointment with key ${newKey} not found`;

    if (oldAppointment.data().uid != uid)
      throw `Failed to replace, missmatch between given id and appointment owner id`;

    if (newAppointment.data().available == false)
      throw "Failed to replace appointment, the new appointment already taken by another user";

    await admin
      .firestore()
      .collection("Appointments")
      .doc(newKey)
      .update({ available: false, uid: uid });

    await admin
      .firestore()
      .collection("Appointments")
      .doc(oldKey)
      .update({ available: true, uid: "" });
    return res.send({ msg: "success" });
  } catch (err) {
    console.log(err);
    return res.status(422).send({ msg: "Failed to replace appointment!" });
  }
};
