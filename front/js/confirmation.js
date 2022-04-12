// recupérer l'id fournit par l'url

let params = window.location.search
let ID = params.slice(4)

const numeroDeCommande = document.getElementById('orderId')
numeroDeCommande.innerHTML = ID;


console.log('Numero de commande', ID);