class Renderer {
  constructor() {
    this.cityDiv = $(".cityContainer");
    this.src = $("#my-temp").html();
    this.template = Handlebars.compile(this.src);
  }

  cityRenderer(cities) {
    this.cityDiv.empty();
    let newhtml = this.template({ city: cities });
    this.cityDiv.append(newhtml);
  }
}
