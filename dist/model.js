class Model {
  constructor() {
    this.allCityData = [];
  }

  getDataFromDB() {
    let p = $.get(`/cities`, (cities) => {
      this.allCityData = [];
      for (let city of cities) {
        const newCity = {
          name: city.name,
          temperature: city.temperature,
          condition: city.condition,
          conditionPic: city.conditionPic,
          saved: true,
        };
        this.allCityData.push(newCity);
      }
    });
    return Promise.resolve(p).then(() => {
      return this.allCityData;
    });
  }

  getCityData = (cityName) => {
    let p = $.get(`/city/${cityName}`, (cityInfo) => {
      const newCity = {
        name: cityInfo.name,
        temperature: cityInfo.temperature,
        condition: cityInfo.condition,
        conditionPic: cityInfo.conditionPic,
      };
      this.allCityData.push(newCity);
    });

    return Promise.resolve(p).then(() => {
      return this.allCityData;
    });
  };

  saveCity(city) {
    const name = city.name;
    const temperature = city.temperature;
    const condition = city.condition;
    const conditionPic = city.conditionPic;
    $.ajax({
      url: `city?name=${name}&temperature=${temperature}&condition=${condition}&conditionPic=${conditionPic}`,
      method: "POST",
      data: JSON.stringify(city),
      success: function (city) {},
    });
    this.allCityData.push(city);
  }

  removeCity(cityName) {
    $.ajax({
      url: `/city/:${cityName}`,
      method: "DELETE",
      success: function () {},
    });
  }
}
