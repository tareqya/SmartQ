const functions = require("firebase-functions");
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

const GetUser = require("./GetUser");
const AddAppointment = require("./AddAppointment");
const RemoveAppointment = require("./RemoveAppointment");
const GetUserAppointments = require("./GetUserAppointments");
const FindCloserAppointments = require("./FindCloserAppointments");
const ReplaceAppointment = require("./ReplaceAppointment");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.GetUser = functions.https.onRequest(GetUser);
exports.AddAppointment = functions.https.onRequest(AddAppointment);
exports.RemoveAppointment = functions.https.onRequest(RemoveAppointment);
exports.GetUserAppointments = functions.https.onRequest(GetUserAppointments);
exports.FindCloserAppointments = functions.https.onRequest(
  FindCloserAppointments
);
exports.ReplaceAppointment = functions.https.onRequest(ReplaceAppointment);
