const router = require("express").Router();
const Certs = require("../models/certificate.js");
const jwt = require("jsonwebtoken");
const auth_middleware = require("../auth_middleware.js");
const { body, validationResult } = require("express-validator");

router.get("/user/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    let certs = await Certs.find({ recipient: user_id });
    return res.json(certs);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ errors: { msg: "Server Error in line 41" } });
  }
});

router.get("/all", async (req, res) => {
  try {
    let certs = await Certs.find();
    return res.json(certs);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ errors: { msg: "Server Error in line 41" } });
  }
});

module.exports = router;
