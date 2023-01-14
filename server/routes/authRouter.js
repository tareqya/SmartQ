const axios = require("axios");
const express = require("express");
const router = express.Router();

const BASE_URL = "http://127.0.0.1:5001/smartq-20ef8/us-central1"; // localhost

router.get("/user/:id", async (req, res) => {
  try {
    const uid = req.params.id;
    const response = await axios.post(`${BASE_URL}/GetUser`, { uid });
    const data = response.data;
    if (data.user == null) {
      throw "user not found";
    }
    const user = {
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      phone: data.user.phone,
      id: data.user.id,
    };
    res.send({ user, msg: "success", success: true });
  } catch (error) {
    console.error(error);
    res.status(400).send({ user: null, msg: error, success: false });
  }
});

module.exports = router;
