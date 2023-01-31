const admin = require("firebase-admin");

module.exports = async (req, res) => {
  try {
    const { doctor, time } = req.body;

    const appointement = {
      doctor,
      available: true,
      kid: false,
      time: parseInt(time), //eg: time in mseconds
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
