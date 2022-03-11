

const URL_API = "http://localhost:3000/api/products"

const kanapElement = document.querySelector('section')


fetch(URL_API)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);

  })
  .catch(function(err) {
    // Une erreur est survenue
  });