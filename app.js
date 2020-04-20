const express = require("express");
const config = require("config");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth-routes.js");
const markRoutes = require("./routes/mark-routes.js");
const noteRoutes = require("./routes/note-routes.js");
const userRoutes = require("./routes/user-routes.js");
const statsRoutes = require("./routes/stats-routes.js");
const isolateRoutes = require("./routes/isolate-routes.js");

const app = express();

app.use(
  cookieSession({
    name: "covid-session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.get("cookieKey")],
  })
);

app.use(cookieParser());

// app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/stats", statsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/mark", markRoutes);
app.use("/api/note", noteRoutes);
app.use("/api/user", userRoutes);
app.use("/api/isolated", isolateRoutes);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
