const URL_API = "http://localhost:3000/api/products/order"



let products = JSON.parse(localStorage.getItem('panier'));
console.log('liste', products)

const cartItems = document.getElementById('cart__items')
const articlesElem = document.getElementById('totalQuantity')
const priceElem = document.getElementById('totalPrice')

let totalPrice = 0
let nbArticles = 0

function displayCart() {
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
        contentDescriptionPrice.innerHTML = product.info.price + ' €'
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
    });
}

function removeItemCart() {
    let btn_supprimer = document.getElementsByClassName('deleteItem');
    console.log(btn_supprimer)

    for (let i = 0; i < btn_supprimer.length; i++){

        btn_supprimer[i].addEventListener('click', () =>{

            products.splice(i, 1);

            console.log('New Liste', products)

            localStorage.setItem('panier', JSON.stringify(products))
            window.location.reload();
        })
    }
}

function sendOrder(order) {
    fetch(URL_API, {
        method: "POST",
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(order)
    })
    .then(function(res){
        if (res.ok) {
            console.log('res.ok',res.ok);
            return res.json();
        }
    })
    .then(function(value){
        console.log(value);
        // récupérer l'id qui est envoyer par l'API
        // vider le localStorage
        // faire un redirect vers la page de commande en mettant en paramètre l'id
    })
    console.log("sendOrder");
}

const formulaireDeCommande = document.querySelector('.cart__order__form')

formulaireDeCommande.addEventListener('submit', (e) =>{
    e.preventDefault();


    
    const formData = new FormData(formulaireDeCommande)
    const prenom = formData.get('firstName')
    const nom = formData.get('lastName')
    const adress = formData.get('address')
    const ville = formData.get('city')
    const email = formData.get('email')




    const informationFormulaire = {prenom, nom, adress, ville, email}

    localStorage.setItem('Formulaire', JSON.stringify(informationFormulaire))

    // récuperer les id des produits et les mettres dans un tableau

    const productsID = products.info._id
    console.log('productsID',productsID);

    //

    const payload = {contact: informationFormulaire, produits: products}
    console.log('Payload',payload);
    sendOrder(payload);
    
    console.log("Information Formulaire",informationFormulaire);

    // console.log('Information Client', { prenom, nom, adress, ville, email}, products);
})

// const getPrenom = document.getElementById('firstName').value = localStorage.getItem()



displayCart();
removeItemCart();


articlesElem.innerHTML = nbArticles
priceElem.innerHTML = totalPrice