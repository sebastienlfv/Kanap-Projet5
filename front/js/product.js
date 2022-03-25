const URL_API = "http://www.localhost:3000/api/products/"
const URL_ID = window.location.search;
const justID = URL_ID.slice(1)
const endPoint = (URL_API) + (justID)

function fetchProduct() {
    fetch(endPoint)
      .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function(dataFromApi) {
        console.log(dataFromApi);
        displayProduct(dataFromApi)
      })
      .catch(function(err) {
  
      });
  }

function displayProduct(product) {

    const titleElem = document.getElementById('title')
    titleElem.innerHTML = product.name;

    const selectColor = document.getElementById('colors')

    const priceKanap = document.getElementById('price')
    priceKanap.innerHTML = product.price;

    const descriptionKanap = document.getElementById('description')
    descriptionKanap.innerHTML = product.description;

    const divImgKanap = document.getElementById('item_img')
    const imgKanap = document.createElement('img')

    divImgKanap.appendChild(imgKanap);
    imgKanap.src = product.imageUrl



    product.colors.forEach(color => {
        
        const optionColor = document.createElement('option')

        optionColor.value = color;
        optionColor.innerText = color;
        selectColor.appendChild(optionColor);

    });

    addKanap(product);
}

const addKanap = (product) => {
  let bouton = document.getElementById('addToCart');
  console.log(bouton);
  bouton.addEventListener('click', () => {
    // créer une variable cartItem qui est un objet vide
    let localStorageItems = JSON.parse(localStorage.getItem('produit')) || [];
    let allItemsInCart = []
    let cartItem = {}
    let colorKanap = document.getElementById('colors')
    let quantityKanap = document.getElementById('quantity')

    // cartitem.info = information de mon produit

    cartItem.info = product
    cartItem.id = product._id
    console.log(cartItem.id)

    // cartItem.quantity = quantité sélectionner dans le selecteur

    cartItem.quantity = quantityKanap.value

    // cartItem.selectedVariant = la variante sélectionner dans le selecteur

    cartItem.selectedVariant = colorKanap.value
    console.log(cartItem)

    // l'ajout de cartItem dans le localStorage

    localStorageItems = [...localStorageItems, cartItem];
    localStorage.setItem('produit', JSON.stringify(localStorageItems))



    console.log('localStorageItems', localStorageItems)

    // Vérifier si il y a déjà le même canapé dans le panier ainsi que la même variante de couleur, si oui

    if (localStorage.getItem(cartItem.id)){
      cartItem.quantity++
    }

    // Alors rajouter une quantité 

  });
};

fetchProduct();