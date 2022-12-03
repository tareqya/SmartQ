const express = require("express");
const app = express();

const queueManagmentRouter = require("./routes/qRouter");
const authRouter = require("./routes/authRouter");

app.use("/api", queueManagmentRouter);
app.use("/api", authRouter);

app.listen(3000, () => {
  console.log("Port is listing...");
});
