const admin = require("firebase-admin");

module.exports = async (req, res) => {
  if (!req.body.uid) {
    return res.status(422).send({ msg: "Bad input" });
  }
  const { uid } = req.body;
  try {
    var snapshot = await admin
      .firestore()
      .collection("Users")
      .where("id", "==", uid)
      .get();
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data() };
    });

    if (data.length == 0)
      return res.send({ user: null, msg: "user not found!" });

    return res.send({ user: data[0], msg: "success" });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ msg: "failed", user: null });
  }
};
