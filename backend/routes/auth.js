const router = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth_middleware = require("../auth_middleware.js");
const { body, validationResult } = require("express-validator");

router.get("/user", auth_middleware, (req, res) => {
  if (req.user) {
    return res.status(200).json(req.user);
  } else {
    return res.status(400).send("No User");
  }
});

router.post(
  "/login",
  body("email", "Please provide a valid email").isEmail(),
  body("password", "Password is required").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: { id: user.id },
      };

      jwt.sign(payload, "ilovesp", (err, token) => {
        if (err) {
          throw err;
        }
        return res.json({ token });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

router.post(
  "/register",
  body(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  body("email", "Email is required").isEmail(),
  body("password2", "Please confirm your password").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { email, password, password2, name } = req.body;
    if (password !== password2)
      return res
        .status(400)
        .json({ errors: [{ msg: "Passwords do not match!" }] });

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email has been taken" }] });
      }
      user = new User({
        name,
        email,
        organisation: false,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, "ilovesp", { expiresIn: 360000000 }, (err, token) => {
        if (err) throw err;
        return res.json({ token });
      });
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ errors: [{ msg: "Server Error at line 62" }] });
    }
  }
);

module.exports = router;
