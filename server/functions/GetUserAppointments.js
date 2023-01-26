const admin = require("firebase-admin");

const MaxAppointmentsNum = 10;

module.exports = async (req, res) => {
  if (!req.body.uid) {
    return res.status(422).send({ msg: "Bad input", appointements: null });
  }

  const { uid } = req.body;
  var limit = req.body.limit;
  if (limit == undefined) limit = MaxAppointmentsNum;

  try {
    const snapshot = await admin
      .firestore()
      .collection("Appointments")
      .where("uid", "==", uid)
      .get();

    var data = snapshot.docs.map((doc) => {
      return { ...doc.data(), key: doc.id };
    });

    data = data.sort((a, b) => b.time - a.time);
    data.slice(0, limit);
    return res.send({ appointments: data, msg: "success" });
  } catch (err) {
    console.log(err);
    return res
      .status(422)
      .send({ msg: "Failed to fetch appointments", appointments: null });
  }
};
