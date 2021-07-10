//initialisation du local storage en retournant à l'accueil
function resetStorage() {
    localStorage.clear();
}
document.getElementById('retour-accueil1').addEventListener('click', resetStorage);
document.getElementById('retour-accueil2').addEventListener('click', resetStorage);

//récupération du localstorage
let products = JSON.parse(localStorage.getItem("products"));
let tableauProduits = JSON.parse(localStorage.getItem("tableauStorage"));
let contact = JSON.parse(localStorage.getItem("contact"));

//loader de 3,5 secondes
const loader = document.querySelector('div.loader');
setTimeout(function () {
    loader.className += " hidden";
}, 3500)

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
    console.log(rep);
    let resultat = rep.json();
    return resultat;
})
.then(function (value) {
    orderId = value.orderId;
    displayId();
})
.catch(function(error) {
    console.log('erreur !' + error);
})

//fonction pour ajouter l'Id
let identifiant = document.getElementById('identifiant');
function displayId() {
    identifiant.innerHTML += '<br><p>' + orderId + '</p>';
}