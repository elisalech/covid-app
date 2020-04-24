const path = require("path");
const fs = require("fs");
const Isolation = require("../models/Isolation");
const { getIsolationById } = require("../controllers/isolation-controllers");

const PATH_TO_INDEX = path.resolve(
  __dirname,
  "../",
  "client",
  "build",
  "index.html"
);

const isolationMeta = async (req, res) => {
  const id = req.params.iid;
  const isolation = await Isolation.findById(id);

  if (!isolation) {
    defaultMeta(req, res);
    return;
  }

  const { comment, image } = isolation;

  fs.readFile(PATH_TO_INDEX, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    data = data.replace(/\$META_TITLE/g, "I am self-isolating here!");
    data = data.replace(/\$META_DESCRIPTION/g, comment);
    result = data.replace(/\$META_IMAGE/g, image);
    res.send(result);
  });
};

function defaultMeta(req, res) {
  fs.readFile(PATH_TO_INDEX, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    data = data.replace(/\$META_TITLE/g, "Covid places app");
    data = data.replace(/\$META_DESCRIPTION/g, "comment");
    result = data.replace(/\$META_IMAGE/g, "image");
    res.send(result);
  });
}
