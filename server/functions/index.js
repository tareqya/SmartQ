const functions = require("firebase-functions");
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

const GetUser = require("./GetUser");
const UpdateToken = require("./UpdateToken");
const AddAppointment = require("./AddAppointment");
const ChangeAppointmentStatus = require("./ChangeAppointmentStatus");
const GetUserAppointments = require("./GetUserAppointments");
const FindCloserAppointments = require("./FindCloserAppointments");
const ReplaceAppointment = require("./ReplaceAppointment");
const GetAvailableAppointmentsByDate = require("./GetAvailableAppointmentsByDate");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.GetUser = functions.https.onRequest(GetUser);
exports.UpdateToken = functions.https.onRequest(UpdateToken);
exports.AddAppointment = functions.https.onRequest(AddAppointment);
exports.ChangeAppointmentStatus = functions.https.onRequest(
  ChangeAppointmentStatus
);
exports.GetUserAppointments = functions.https.onRequest(GetUserAppointments);
exports.FindCloserAppointments = functions.https.onRequest(
  FindCloserAppointments
);
exports.ReplaceAppointment = functions.https.onRequest(ReplaceAppointment);
exports.GetAvailableAppointmentsByDate = functions.https.onRequest(
  GetAvailableAppointmentsByDate
);
