const admin = require("firebase-admin");

module.exports = async (req, res) => {
  if (!req.body.uid || !req.body.password) {
    return res.status(422).send({ msg: "Bad input" });
  }
  const { uid, password } = req.body;
  try {
    var snapshot = await admin
      .firestore()
      .collection("Users")
      .where("id", "==", uid)
      .get();
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data() };
    });

    if (data.length == 0) throw "Username or Password not correct!";

    const user = data[0];
    if (user.password != password) throw "Username or Password not correct!";
    return res.send({ user: data[0], msg: "success" });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ msg: err, user: null });
  }
};
