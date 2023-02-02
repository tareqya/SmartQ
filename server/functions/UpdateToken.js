const admin = require("firebase-admin");

module.exports = async (req, res) => {
  try {
    if (!req.body.token || !req.body.uid) throw "Bad input!";

    const { token, uid } = req.body;

    var snapshot = await admin
      .firestore()
      .collection("Users")
      .where("id", "==", uid)
      .get();

    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), key: doc.id };
    });

    if (data.length == 0) throw "Id not found!";

    const user = data[0];

    await admin.firestore().collection("Users").doc(user.key).update({ token });

    return res.send({ msg: "success" });
  } catch (err) {
    console.log(err);
    return res.status(422).send({ msg: "Failed to add appointment!" });
  }
};
