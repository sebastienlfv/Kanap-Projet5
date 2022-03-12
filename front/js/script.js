

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
      console.log(value);
      displayKanap(value)
    })
    .catch(function(err) {

    });
}

function displayKanap(dataFromApi) {
  const kanapElement = document.querySelector('#items')

  for (let i = 0; i < dataFromApi.length; i++) {

    let linkKanap = document.createElement("a");
    linkKanap.href = dataFromApi[i]._id;
    kanapElement.appendChild(linkKanap)

    let containerKanap = document.createElement("article");
    linkKanap.appendChild(containerKanap)

    let imgKanap = document.createElement("img")
    imgKanap.src = dataFromApi[i].imageUrl;
    containerKanap.appendChild(imgKanap)
    
    let titleKanap = document.createElement("h3");
    titleKanap.innerHTML = dataFromApi[i].name;
    containerKanap.appendChild(titleKanap)

    let paragraph = document.createElement("p");
    paragraph.innerHTML = dataFromApi[i].description;
    containerKanap.appendChild(paragraph)
  }
}