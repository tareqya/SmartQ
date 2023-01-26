const functions = require("firebase-functions");
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");
const AddAppointment = require("./AddAppointment");
const GetUser = require("./GetUser");
const RemoveQueue = require("./RemoveQueue");
const GetUserAppointments = require("./GetUserAppointments");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.AddAppointment = functions.https.onRequest(AddAppointment);
exports.GetUser = functions.https.onRequest(GetUser);
exports.RemoveQueue = functions.https.onRequest(RemoveQueue);
exports.GetUserAppointments = functions.https.onRequest(GetUserAppointments);
