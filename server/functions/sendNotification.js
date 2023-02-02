const { Expo } = require("expo-server-sdk");
const ACCESS_TOKEN = "Qe-6rjX8I9UwkEsfwu8CSm4mFvuq_7EgJJbkelGm";
module.exports = async (tokens, msg) => {
  try {
    let expo = new Expo({ accessToken: ACCESS_TOKEN });
    const title = "SmartQ";
    const messages = [];
    for (let token of tokens) {
      const message = {
        to: token,
        sound: "default",
        title: title,
        body: msg,
        data: { data: "" },
      };
      if (Expo.isExpoPushToken(token)) {
        messages.push(message);
      }
    }

    let chunks = expo.chunkPushNotifications(messages);
    for (let chunk of chunks) {
      await expo.sendPushNotificationsAsync(chunk);
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
