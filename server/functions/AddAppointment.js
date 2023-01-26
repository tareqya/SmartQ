const admin = require("firebase-admin");

module.exports = async (req, res) => {
  try {
    const { doctor, time } = req.body;

    const appointement = {
      doctor,
      available: true,
      kid: false,
      time: new Date(time).getTime(), //eg: time format => MM/DD/YYYY HH:mm
      uid: "",
      doctorImage: "",
    };
    await admin.firestore().collection("Appointments").add(appointement);

    return res.send({ msg: "success" });
  } catch (err) {
    console.log(err);
    return res.status(422).send({ msg: "Failed to add appointment!" });
  }
};
