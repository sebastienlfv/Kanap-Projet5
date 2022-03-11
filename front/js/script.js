

main();

async function main() {
  fetchKanaps();
}

function fetchKanaps() {
  const URL_API = "http://www.localhost:3000/api/products"
  fetch(URL_API)
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      console.log(value)
      displayKanap(value)
    })
    .catch(function(err) {

    });
}

function displayKanap(dataFromApi) {
  const kanapElement = document.querySelector('#items')

  for (let i = 0; i < dataFromApi.lenght; i++){
    let paragraph = document.createElement("p");
    paragraph.innerHTML = dataFromApi[i].name;
    kanapElement.appendChild(paragraph)
  }
}