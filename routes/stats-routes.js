const { Router } = require("express");
const axios = require("axios");
const { getWorldometers } = require("../helpers/parseStats");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const prevRes = await axios.get(
      "https://pomber.github.io/covid19/timeseries.json"
    );
    const prevData = Object.entries(prevRes.data);

    let latest = await getWorldometers();

    console.log("latest", latest);

    const previous = { confirmed: 0, deaths: 0, recovered: 0 };

    prevData.forEach((list) => {
      const country = list[1];

      const countryPrevious = country.pop();

      previous.confirmed += countryPrevious.confirmed;
      previous.deaths += countryPrevious.deaths;
      previous.recovered += countryPrevious.recovered;
    });

    console.log("previous", previous);

    const updates = {
      confirmed: latest.confirmed - previous.confirmed,
      deaths: latest.deaths - previous.deaths,
      recovered: latest.recovered - previous.recovered,
    };

    // res.json(JSON.stringify(obj.features));
    res.json({ updates, latest });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Sth went wrong" });
  }
});

module.exports = router;
