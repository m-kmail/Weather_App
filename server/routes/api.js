const express = require("express");
const router = express.Router();
const urllib = require("urllib");
const allCities = require("../../modules/city");

router.get("/city/:cityName", function (req, res) {
  const cityName = req.params.cityName;
  const url = `http://api.openweathermap.org/data/2.5/weather?units=metric&APPID=169ccbecd498a79a8d7807cd78b0d15e&q=${cityName}`;

  urllib.request(url, function (err, data) {
    const city = JSON.parse(data);
    const cityInfo = {
      name: city.name,
      temperature: city.main.temp,
      condition: city.weather[0].description,
      conditionPic: city.weather[0].icon,
    };
    res.send(cityInfo);
  });
});

router.get("/cities", function (req, res) {
  allCities.find({}, function (err, city) {
    res.send(city);
  });
});

router.post("/city", function (req, res) {
  const city = req.query;
  const newCity = new allCities({
    name: city.name,
    temperature: city.temperature,
    condition: city.condition,
    conditionPic: city.conditionPic,
    saved: true,
  });
  newCity.save();
  res.send(newCity);
});

router.delete(`/city/:cityName`, function (req, res) {
  const cityName = req.params.cityName.substring(1);
  console.log(cityName);

  allCities.findOneAndDelete({ name: cityName }, function (err, deletedOne) {
    res.end();
  });
});

module.exports = router;
