const admin = require("firebase-admin");

module.exports = async (req, res) => {
  try {
    if (!req.body.uid || !req.body.time || req.body.kid == undefined) {
      throw "Bad input";
    }

    const { time, kid, uid } = req.body;
    var snapshot = await admin
      .firestore()
      .collection("Appointments")
      .where("available", "==", true)
      .get();

    const currentTime = new Date().getTime();
    var data = snapshot.docs.filter((doc) => {
      return (
        doc.data().time < time &&
        doc.data().time >= currentTime &&
        doc.data().kid == kid &&
        doc.data().uid != uid
      );
    });

    data = data.map((doc) => {
      return { ...doc.data(), key: doc.id };
    });

    data = data.sort((a, b) => a.time - b.time);

    return res.send({ appointments: data, msg: "success" });
  } catch (err) {
    console.error(err);
    return res
      .status(422)
      .send({ msg: "Failed to fetch appointments", appointments: null });
  }
};
