const express = require("express");
const cors = require("cors");
const connectDB = require("./db.js");
const app = express();
const PORT = 5000;
app.use(cors());

app.use(express.json());
connectDB();

app.get("/", (req, res) => res.send("Portbonder API running"));

app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/certs", require("./routes/certs.js"));

app.listen(process.env.PORT || PORT, () =>
  console.log(`Server Running on http://localhost:${PORT}`)
);
