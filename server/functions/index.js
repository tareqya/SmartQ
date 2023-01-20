const functions = require("firebase-functions");
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");
const AddQueue = require("./AddQueue");
const GetUser = require("./GetUser");
const GetUserQueuesByDate = require("./GetUserQueuesByDate");
const RemoveQueue = require("./RemoveQueue");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.AddQueue = functions.https.onRequest(AddQueue);
exports.GetUser = functions.https.onRequest(GetUser);
exports.GetUserQueuesByDate = functions.https.onRequest(GetUserQueuesByDate);
exports.RemoveQueue = functions.https.onRequest(RemoveQueue);
