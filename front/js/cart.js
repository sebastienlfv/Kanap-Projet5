const URL_API = "http://www.localhost:3000/api/products/"


function fetchProduct() {
    fetch(URL_API)
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


let addProduit = JSON.parse(localStorage.getItem('produit'));

const panierDisplay = async (product) => {

    const cartItems = document.getElementById('cart__items')

    const cartItem = document.createElement('article')
    cartItem.classList.add('cart__item')
    cartItems.appendChild(cartItem)

    const itemImgKanapCart = document.createElement('div')
    itemImgKanapCart.classList.add('cart__item__img')
    cartItem.appendChild(itemImgKanapCart)

    const imgItemKanapCart = document.createElement('img')
    // imgItemKanapCart.src = product.imageUrl
    itemImgKanapCart.appendChild(imgItemKanapCart)
    
    const carteItemContent = document.createElement('div')
    carteItemContent.classList.add('cart__item__content')
    cartItem.appendChild(carteItemContent)

    const carteItemContentDescription = document.createElement('div')
    carteItemContentDescription.classList.add('cart__item__content__description')
    carteItemContent.appendChild(carteItemContentDescription)

    const contentDescriptionTitre = document.createElement('h2')
    // contentDescriptionTitre.innerHTML = product.name
    carteItemContentDescription.appendChild(contentDescriptionTitre)

    const contentDescriptionCouleur = document.createElement('p')
    // contentDescriptionCouleur.innerHTML = product.colors
    carteItemContentDescription.appendChild(contentDescriptionCouleur)

    const contentDescriptionPrice = document.createElement('p')
    // contentDescriptionPrice.innerHTML = product.price
    carteItemContentDescription.appendChild(contentDescriptionPrice)

    const carteItemContentSettings = document.createElement('div')
    carteItemContentSettings.classList.add('cart__item__content__settings')
    carteItemContent.appendChild(carteItemContentSettings)

    const contentSettingsQuantity = document.createElement('div')
    contentSettingsQuantity.classList.add('cart__item__content__settings__quantity')
    carteItemContentSettings.appendChild(contentSettingsQuantity)

    const contentSettingsQuantityP = document.createElement('p')
    // contentSettingsQuantityP.innerHTML =
    contentSettingsQuantity.appendChild(contentSettingsQuantityP)

    const contentSettingsQuantityInput = document.createElement('input')
    contentSettingsQuantityInput.classList.add('itemQuantity')
    contentSettingsQuantity.appendChild(contentSettingsQuantityInput)

    const contentSettingsDelete = document.createElement('div')
    contentSettingsDelete.classList.add('cart__item__content__settings__delete')
    carteItemContentSettings.append(contentSettingsDelete)

    const contentSettingsDeleteP = document.createElement('p')
    contentSettingsDeleteP.classList.add('deleteItem')
    contentSettingsDeleteP.innerHTML = "Suppimer"
    contentSettingsDelete.appendChild(contentSettingsDeleteP)



    if(addProduit) {
        await addProduit;
        console.log(addProduit);
    }
};

panierDisplay();