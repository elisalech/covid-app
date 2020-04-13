const axios = require("axios");

const getDate = () => {
  const date = new Date();
  let dd = date.getDate();
  if (dd < 10) dd = "0" + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = "0" + mm;

  let yy = date.getFullYear() % 100;
  if (yy < 10) yy = "0" + yy;

  return dd + "." + mm + "." + yy;
};

const getUpdates = async () => {
  const prevRes = await axios.get(
    "https://pomber.github.io/covid19/timeseries.json"
  );
  const prevData = Object.entries(prevRes.data);

  let latestRes = await axios.get("https://corona.lmao.ninja/all");

  latestRes = latestRes.data;

  const latest = {
    confirmed: latestRes.cases,
    deaths: latestRes.deaths,
    recovered: latestRes.recovered
  };

  console.log("latest", latest);

  const previous = { confirmed: 0, deaths: 0, recovered: 0 };

  prevData.forEach(list => {
    const country = list[1];

    const countryPrevious = country.pop();

    previous.confirmed += countryPrevious.confirmed;
    previous.deaths += countryPrevious.deaths;
    previous.recovered += countryPrevious.recovered;
  });

  const updates = {
    confirmed: latest.confirmed - previous.confirmed,
    deaths: latest.deaths - previous.deaths,
    recovered: latest.recovered - previous.recovered
  };

  console.log("updates", updates);

  return { updates, latest };
};

module.exports = { getDate, getUpdates };
