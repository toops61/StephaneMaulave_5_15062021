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

//loader de 4 secondes
const loader = document.querySelector('div.loader');
setTimeout(function () {
    loader.className += " hidden";
}, 3500)

//affichage du nom
document.querySelector("section h1").textContent += contact.lastName;
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
requestObject.contact = JSON.stringify(contact);
requestObject.products = JSON.stringify(products);

let request = (url, {
    method: 'POST',
    body: requestObject.contact,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

fetch(request)
.then(function(reponse) {
    console.log(reponse);
    console.log(reponse.url);
})
.catch(function(error) {
    console.log('raté !' + error);
})