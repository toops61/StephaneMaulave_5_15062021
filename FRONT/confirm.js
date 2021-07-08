//initialisation du local storage en retournant à l'accueil
function resetStorage() {
    localStorage.clear();
}
document.getElementById('retour-accueil1').addEventListener('click', resetStorage);
document.getElementById('retour-accueil2').addEventListener('click', resetStorage);

//récupération du panier
let totalArray = JSON.parse(localStorage.getItem("panierTableau"));
let panierContact = JSON.parse(localStorage.getItem("objetContact"));

//loader de 4 secondes
const loader = document.querySelector('div.loader');
setTimeout(function () {
    loader.className += " hidden";
}, 3500)

//affichage du nom
document.querySelector("section h1").textContent += panierContact.prenom;

//total de la commande
let total = document.getElementById('total').textContent;
let totalPrice = 0;
for (let i = 0; i < totalArray.length; i++) {
    totalPrice += totalArray[i].totalProduct;
}
totalPrice += ' Euros';
total += totalPrice;
document.getElementById('total').textContent = total;

//API fetch requete POST pour formulaire et array de produits
const url = 'http://localhost:3000/api/teddies/order';

/* var request = new Request(url, {
    method: 'POST',
    body: panierContact,
    headers: new Headers()
});

fetch(request)
.then(function() {
    console.log('ok');
})
.catch(function() {
    console.log('raté !');
}) */