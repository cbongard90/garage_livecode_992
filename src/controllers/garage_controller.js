import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["carsList"]

  connect() {
    // The name of the garage
    this.garageName = "garage-992"
    // The generic name of the garapeAPI
    this.garageUrl = `https://wagon-garage-api.herokuapp.com/${this.garageName}/cars`

    fetch(this.garageUrl)
    .then(response => response.json())
    .then((data) => {
      console.log(data);

      // Iterate over the data with a forEach
      data.forEach(car => {
        this.#insertCarCard(car)
      });
    })
  }

  #insertCarCard(car) {
    const carCard = `
        <div class="car">
          <div class="car-image">
            <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
          </div>
          <div class="car-info">
            <h4>${car.brand} ${car.model}</h4>
            <p><strong>Owner:</strong> ${car.owner}</p>
            <p><strong>Plate:</strong> ${car.plate}</p>
          </div>
        </div>
        `
    this.carsListTarget.insertAdjacentHTML('beforeend', carCard)
  }
}
