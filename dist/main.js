const renderer = new Renderer();
const model = new Model();
const cityNameInput = $("#in");

const loadPage = function () {
  let loadCityData = model.getDataFromDB();
  loadCityData.then(function (allCities) {
    renderer.cityRenderer(allCities);
  });
};

const handleSearch = function () {
  const cityName = cityNameInput.val();
  cityNameInput.val("");
  let loadCityData = model.getCityData(cityName);

  loadCityData.then(function (allCities) {
    renderer.cityRenderer(allCities);
  });
};

$("body").on("click", ".addbtn", function () {
  $(this).hide();
  $(this).closest("#buttonDiv").find(".delbtn").show();

  const cityName = $(this)
    .closest(".oneCity")
    .find(".nameAndTemp")
    .find(".name")
    .text();

  let cityTemp = $(this)
    .closest(".oneCity")
    .find(".nameAndTemp")
    .find(".temp")
    .text();
  cityTemp = cityTemp.slice(0, -1);

  const cityCondition = $(this)
    .closest(".oneCity")
    .find(".iconAndCondition")
    .find(".condition")
    .text();

  let cityIcon = $(this)
    .closest(".oneCity")
    .find(".iconAndCondition")
    .find(".weatherImage")
    .attr("src");
  cityIcon = cityIcon.replace(`http://openweathermap.org/img/w/`, " ");
  cityIcon = cityIcon.replace(".png", " ");
  cityIcon = cityIcon.trim();

  const city = {
    name: cityName,
    temperature: cityTemp,
    condition: cityCondition,
    conditionPic: cityIcon,
  };
  model.saveCity(city);
});

$("body").on("click", ".delbtn", function () {
  $(this).hide();
  $(this).closest("#buttonDiv").find(".addbtn").show();

  const cityName = $(this)
    .closest(".oneCity")
    .find(".nameAndTemp")
    .find(".name")
    .text();

  model.removeCity(cityName);
});

$("#search").on("click", handleSearch);
