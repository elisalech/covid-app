const path = require("path");
const fs = require("fs");

const PATH_TO_INDEX = path.resolve(
  __dirname,
  "../",
  "client",
  "build",
  "index.html"
);

const isolationMeta = async (req, res) => {
  console.log(req.body);
  const filePath = PATH_TO_INDEX;
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    data = data.replace(/\$META_TITLE/g, body.title);
    data = data.replace(/\$META_DESCRIPTION/g, body.description);
    result = data.replace(/\$META_IMAGE/g, body.thumbnail);
    res.send(result);
  });
};
