class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  headers: {
    authorization: "46c74c8a-760c-42f8-a550-bb29200a256b"
  }
})
  .then(res => res.json())
  }

  // other methods for working with the API
}

export default Api;