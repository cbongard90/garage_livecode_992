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

      // Clean the car List
      this.carsListTarget.innerHTML = ""
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

  createCar(event) {
    event.preventDefault();
    // get the userdata
    const formData = new FormData(event.currentTarget)
    const newCar = Object.fromEntries(formData)

    fetch(this.garageUrl, {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(newCar)
    })
    .then(() => {
      this.#refreshCarCards()
    })
    event.currentTarget.reset()
  }

  #refreshCarCards() {
    fetch(this.garageUrl)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        // Clean the car List
        this.carsListTarget.innerHTML = ""
        // Iterate over the data with a forEach
        data.forEach(car => {
          this.#insertCarCard(car)
        });
      })
  }
}
