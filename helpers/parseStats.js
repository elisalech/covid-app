const axios = require("axios");
const cheerio = require("cheerio");

const getWorldometers = async () => {
  let res = await axios.get("https://www.worldometers.info/coronavirus/");

  const $ = cheerio.load(res.data);
  const latest = {};

  const all = $("body .content-inner")
    .find("div.maincounter-number")
    .toArray()
    .map((el) => $(el).find("span").html().split(",").join("").trim());
  const updated = $(".label-counter").next().html();

  latest.confirmed = all[0];
  latest.deaths = all[1];
  latest.recovered = all[2];
  latest.updated = updated;

  return latest;
};

module.exports = { getWorldometers };
