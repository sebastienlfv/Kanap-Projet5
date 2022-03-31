const URL_API = "http://www.localhost:3000/api/products/"



let products = JSON.parse(localStorage.getItem('panier'));
console.log('liste', products)

const cartItems = document.getElementById('cart__items')
const articlesElem = document.getElementById('totalQuantity')
const priceElem = document.getElementById('totalPrice')

let totalPrice = 0
let nbArticles = 0

products.forEach(product => {

    nbArticles += product.quantity
    totalPrice += product.info.price

    const cartItem = document.createElement('article')
    cartItem.classList.add('cart__item')
    cartItems.appendChild(cartItem)

    const itemImgKanapCart = document.createElement('div')
    itemImgKanapCart.classList.add('cart__item__img')
    cartItem.appendChild(itemImgKanapCart)

    const imgItemKanapCart = document.createElement('img')
    imgItemKanapCart.src = product.info.imageUrl
    itemImgKanapCart.appendChild(imgItemKanapCart)
    
    const carteItemContent = document.createElement('div')
    carteItemContent.classList.add('cart__item__content')
    cartItem.appendChild(carteItemContent)

    const carteItemContentDescription = document.createElement('div')
    carteItemContentDescription.classList.add('cart__item__content__description')
    carteItemContent.appendChild(carteItemContentDescription)

    const contentDescriptionTitre = document.createElement('h2')
    contentDescriptionTitre.innerHTML = product.info.name
    carteItemContentDescription.appendChild(contentDescriptionTitre)

    const contentDescriptionCouleur = document.createElement('p')
    contentDescriptionCouleur.innerHTML = product.selectedVariant
    carteItemContentDescription.appendChild(contentDescriptionCouleur)

    const contentDescriptionPrice = document.createElement('p')
    contentDescriptionPrice.innerHTML = product.info.price
    carteItemContentDescription.appendChild(contentDescriptionPrice)

    const carteItemContentSettings = document.createElement('div')
    carteItemContentSettings.classList.add('cart__item__content__settings')
    carteItemContent.appendChild(carteItemContentSettings)

    const contentSettingsQuantity = document.createElement('div')
    contentSettingsQuantity.classList.add('cart__item__content__settings__quantity')
    carteItemContentSettings.appendChild(contentSettingsQuantity)

    const contentSettingsQuantityP = document.createElement('p')
    contentSettingsQuantityP.innerHTML = 'Qté :'
    contentSettingsQuantity.appendChild(contentSettingsQuantityP)

    const contentSettingsQuantityInput = document.createElement('input')
    contentSettingsQuantityInput.type = 'number'
    contentSettingsQuantityInput.name = 'itemQuantity'
    contentSettingsQuantityInput.min = '1'
    contentSettingsQuantityInput.max = '100'
    contentSettingsQuantityInput.value = product.quantity
    contentSettingsQuantityInput.classList.add('itemQuantity')
    contentSettingsQuantity.appendChild(contentSettingsQuantityInput)

    const contentSettingsDelete = document.createElement('div')
    contentSettingsDelete.classList.add('cart__item__content__settings__delete')
    carteItemContentSettings.append(contentSettingsDelete)

    const contentSettingsDeleteP = document.createElement('p')
    contentSettingsDeleteP.classList.add('deleteItem')
    contentSettingsDeleteP.innerHTML = "Supprimer"
    contentSettingsDelete.appendChild(contentSettingsDeleteP)


    let btn_supprimer = document.querySelectorAll('.deleteItem');
    console.log(btn_supprimer)

    for (let l = 0; l < btn_supprimer.length; l++){
        btn_supprimer[l].addEventListener('click', (event) =>{
            event.preventDefault();
            console.log(event)

            let id_delete = product.info._id;

            product = product.filter(elem => elem.info._id !== id_delete);

            localStorage.setItem('produit', JSON.stringify(product));

            alert("Ce produit a été supprimer du panier")
            window.location.href = 'cart.html'
        })
    }
});


articlesElem.innerHTML = nbArticles
priceElem.innerHTML = totalPrice