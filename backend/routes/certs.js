const router = require("express").Router();
const Certs = require("../models/certificate.js");
const Users = require("../models/user.js");
const jwt = require("jsonwebtoken");
const auth_middleware = require("../auth_middleware.js");
const { body, validationResult } = require("express-validator");

router.get("/user/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    let certs = await Certs.find({ recipient: user_id })
      .populate("issuer")
      .populate("recipient");
    return res.json(certs);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ errors: { msg: "Server Error in line 41" } });
  }
});
router.get("/organisation/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    let certs = await Certs.find({ issuer: user_id })
      .populate("issuer")
      .populate("recipient");
    return res.json(certs);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ errors: { msg: "Server Error in line 41" } });
  }
});

router.get("/all", async (req, res) => {
  try {
    let certs = await Certs.find().populate("issuer");
    return res.json(certs);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ errors: { msg: "Server Error in line 41" } });
  }
});

router.post("/create", auth_middleware, async (req, res) => {
  try {
    let { recipient, title, description, grade } = req.body;
    recipient = await Users.findOne({ email: recipient });
    if (!recipient)
      return res
        .status(400)
        .json({ errors: [{ msg: "No user found with that email" }] });
    await new Certs({
      recipient: recipient.id,
      title,
      description,
      issuer: req.user._id,
      grade,
    }).save();
    return res.status(200).send("i");
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ errors: [{ msg: "Server error in /api/certs/create @POST" }] });
  }
});

module.exports = router;
