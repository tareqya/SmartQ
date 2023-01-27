const functions = require("firebase-functions");
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

const GetUser = require("./GetUser");
const AddAppointment = require("./AddAppointment");
const RemoveAppointment = require("./RemoveAppointment");
const GetUserAppointments = require("./GetUserAppointments");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.AddAppointment = functions.https.onRequest(AddAppointment);
exports.GetUser = functions.https.onRequest(GetUser);
exports.RemoveAppointment = functions.https.onRequest(RemoveAppointment);
exports.GetUserAppointments = functions.https.onRequest(GetUserAppointments);
