const admin = require("firebase-admin");

module.exports = async (req, res) => {
  try {
    if (!req.body.time || !req.body.uid || req.body.kid == undefined) {
      throw "Bad input";
    }
    const { time, kid, uid } = req.body;
    const date = new Date(time);
    const from = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      7,
      0,
      0
    );
    from.setDate(from.getDate() - 1);
    const to = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      0,
      0
    );
    to.setDate(to.getDate() - 1);
    var snapshot = await admin
      .firestore()
      .collection("Appointments")
      .where("available", "==", true)
      .where("time", ">=", from.getTime())
      .where("time", "<=", to.getTime())
      .where("kid", "==", kid)

      .get();

    var data = snapshot.docs.filter((doc) => {
      return doc.data().uid != uid;
    });

    data = data.map((doc) => {
      return { ...doc.data(), key: doc.id };
    });

    data = data.sort((a, b) => a.time - b.time);

    return res.send({ appointments: data, msg: "success" });
  } catch (err) {
    console.log(err);
    return res
      .status(422)
      .send({ msg: "Failed to get appointments!", appointments: [] });
  }
};
