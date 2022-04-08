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
        totalPrice += product.info.price*product.quantity
    
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

// function calcul(){
//     const quantite = document.querySelector('.itemQuantity').value
//     console.log('Quantite',quantite)

//     document.getElementById('totalQuantity') = ss_total

//     const total = parseFloat(quantite) * parseFloat(ss_total)
//     document.getElementById('totalPrice') = total.toFixed(2)
// }



function removeItemCart() {
    let btn_supprimer = document.getElementsByClassName('deleteItem');
    console.log(btn_supprimer)

    for (let i = 0; i < btn_supprimer.length; i++){

        btn_supprimer[i].addEventListener('click', () =>{

            products.splice(i, 1);

            console.log('New Liste', products)

            localStorage.setItem('panier', JSON.stringify(products))
            window.location.reload();
            // const cartItem = document.querySelector('.cart__item')
            // cartItem.remove();

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
    console.log("sendOrder", order);
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

    // gérer la validation du formulaire

    let prenomID = document.getElementById('firstName')
    let prenomRegex = /^[a-z,A-Z,-,é,è]+$/

    let nomID = document.getElementById('lastName')
    let nomRegex = /^[a-z,A-Z,-,é,è]+$/


    let adressID = document.getElementById('address')
    let adressRegex = /^[a-z,A-Z,-,\s,0-9]+$/


    let villeID = document.getElementById('city')
    let VilleRegex = /^[a-z,A-Z,-]+$/


    let emailID = document.getElementById('email')
    let emailRegex = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/



    // verif prenom

    if(prenomID.value.trim() == '') {
        let firstnameError = document.getElementById('firstNameErrorMsg')
        firstnameError.innerHTML = 'Le champs prénom est requis.'
        firstnameError.style.color = 'red'
        e.preventDefault()
    } else if (prenomRegex.test(prenomID.value) == false) {
        let firstnameError = document.getElementById('firstNameErrorMsg')
        firstnameError.innerHTML = 'Le champs prénom doit comporter des lettres et des tirets uniquements.';
        firstnameError.style.color = 'red'
        e.preventDefault()
    }

    // verif nom

    if(nomID.value.trim() == '') {
        let lastnameError = document.getElementById('lastNameErrorMsg')
        lastnameError.innerHTML = 'Le champs nom est requis.'
        lastnameError.style.color = 'red'
        e.preventDefault()
    } else if (nomRegex.test(nomID.value) == false) {
        let lastnameError = document.getElementById('lastNameErrorMsg')
        lastnameError.innerHTML = 'Le champs nom doit comporter des lettres et des tirets uniquements.';
        lastnameError.style.color = 'red'
        e.preventDefault()
    }

    // verif adress

    if (adressID.value.trim() == '') {
        let adressError = document.getElementById('addressErrorMsg')
        adressError.innerHTML = 'Le champs adresse est requis'
        adressError.style.color = 'red'
        e.preventDefault()
    } else if(adressRegex.test(adressID.value) == false) {
        let adressError = document.getElementById('addressErrorMsg')
        adressError.innerHTML = 'Le champs adresse doit comporter des lettres, des chiffres, des tirets et des espaces uniquements'
        adressError.style.color = 'red'
        e.preventDefault()
    }

    // verif ville

    if (villeID.value.trim() == '') {
        let villeError = document.getElementById('cityErrorMsg')
        villeError.innerHTML = 'Le champs Ville est requis'
        villeError.style.color = 'red'
        e.preventDefault()
    } else if (VilleRegex.test(villeID.value) == false) {
        let villeError = document.getElementById('cityErrorMsg')
        villeError.innerHTML = 'Le champs Ville doit comporter des lettres, des tirets uniquements'
        villeError.style.color = 'red'
        e.preventDefault()
    }

    // verif email

    if (emailID.value.trim() == '') {
        let emailError = document.getElementById('emailErrorMsg')
        emailError.innerHTML = 'Le champs Email est requis'
        emailError.style.color = 'red'
        e.preventDefault()
    } else if (emailRegex.test(emailID.value) == false) {
        let emailError = document.getElementById('emailErrorMsg')
        emailError.innerHTML = "Ceci n'est pas une email valide"
        emailError.style.color = 'red'
        e.preventDefault()
    }



    const informationFormulaire = {prenom, nom, adress, ville, email}

    localStorage.setItem('Formulaire', JSON.stringify(informationFormulaire))

    // récuperer les id des produits et les mettres dans un tableau

    const tableauListeID = {}
    

    const payload = {contact: informationFormulaire, produits: products}
    console.log('Payload',payload);
    sendOrder(payload);
    
    console.log("Information Formulaire",informationFormulaire);

})

// const getPrenom = document.getElementById('firstName').value = localStorage.getItem()



displayCart();
removeItemCart();


articlesElem.innerHTML = nbArticles
priceElem.innerHTML = totalPrice