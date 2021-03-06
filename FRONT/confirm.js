//récupération du localstorage
let products = JSON.parse(localStorage.getItem("products"));
let tableauProduits = JSON.parse(localStorage.getItem("tableauStorage"));
let contact = JSON.parse(localStorage.getItem("contact"));

//affichage du nom
document.querySelector("section h1").textContent += contact.firstName;
//recap commande
let quantiteProduits = 0;
for (let index = 0; index < tableauProduits.length - 1; index++) {
    if (tableauProduits[index].quantite >= 1) {
        quantiteProduits += tableauProduits[index].quantite;
    }
}
document.querySelector('.panier-resume__recap p').innerText += ' ' + quantiteProduits + ' ours en peluche';
//affichage du total du panier
let total = document.getElementById('total');
let totalPanier = tableauProduits[tableauProduits.length - 1];
total.textContent += totalPanier + ' euros';

//API fetch requete POST pour formulaire et array de produits
const url = 'http://localhost:3000/api/teddies/order';
let requestObject = {};
requestObject.contact = contact;
requestObject.products = products;

let request = {
    method: 'POST',
    body: JSON.stringify(requestObject),
    headers: {
        'Content-Type': 'application/json'
    }
};

fetch(url, request)
.then(function(rep) {
    const loader = document.querySelector('div.loader');
    loader.className += " hidden";
    let resultat = rep.json();
    return resultat;
})
.then(function (value) {
    orderId = value.orderId;
    displayId();
    localStorage.clear();
})
.catch(function(error) {
    console.log('erreur !' + error);
})

//fonction pour ajouter l'Id
let identifiant = document.getElementById('identifiant');
function displayId() {
    identifiant.innerHTML += '<br><p>' + orderId + '</p>';
}