const SendNotification = require("./SendNotification");
const admin = require("firebase-admin");

module.exports = async (time, uid, kid) => {
  try {
    var snapshot = await admin
      .firestore()
      .collection("Appointments")
      .where("available", "==", false)
      .where("time", ">", time)
      .where("kid", "==", kid)
      .get();

    const tokens = [];

    var data = snapshot.docs.filter((doc) => {
      return doc.data().uid != uid;
    });

    const appointments = data.map((doc) => {
      return { ...doc.data(), key: doc.id };
    });

    const users_id = [];

    for (let appointment of appointments) {
      if (!users_id.includes(appointment.uid)) users_id.push(appointment.uid);
    }

    for (let user_id of users_id) {
      const response = await admin
        .firestore()
        .collection("Users")
        .where("id", "==", user_id)
        .get();

      const data = response.docs.map((doc) => {
        return { ...doc.data() };
      });

      if (data.length > 0) {
        const user = data[0];
        tokens.push(user.token);
      }
    }

    const date = new Date(time).toLocaleDateString();
    const msg = `התפנה תור בתאריך ${date}`;
    const res = await SendNotification(tokens, msg);
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};
