const admin = require("firebase-admin");

module.exports = async (req, res) => {
  try {
    if (!req.body.time || req.body.kid == undefined) {
      throw "Bad input";
    }

    const { time, kid } = req.body;
    var snapshot = await admin
      .firestore()
      .collection("Appointments")
      .where("available", "==", true)
      .get();

    var data = snapshot.docs.filter((doc) => {
      return doc.data().time < time && doc.data().kid == kid;
    });

    data = data.map((doc) => {
      return { ...doc.data(), key: doc.id };
    });

    data = data.sort((a, b) => b.time - a.time);

    return res.send({ appointments: data, msg: "success" });
  } catch (err) {
    console.error(err);
    return res
      .status(422)
      .send({ msg: "Failed to fetch appointments", appointments: null });
  }
};
