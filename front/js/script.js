
main();

async function main() {
  featchKanaps();
}

function featchKanaps() {
  const URL_API = "http://www.localhost:3000/api/products"
  fetch(URL_API)
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value){
      console.log(value);
      displayKanap(value)
    })
    .catch(function(err){

    })
}

function displayKanap(dataFromApi) {
  const kanapElement = document.querySelector('#items')

  for (let i = 0; i < dataFromApi.lenght; i++){
    let paraprah = document.createElement("p");
    paraprah.innerHTML = dataFromApi[i].name;
    kanapElement.appendChild(paraprah)
  }
}