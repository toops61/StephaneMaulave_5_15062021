//recuperation de ID objet via URL
let nounoursId = window.location.search.substring(4);

//recuperation des infos sur le produit via local storage
let tableauProduits = JSON.parse(localStorage.getItem("tableauStorage"));
for (let i = 0; i < tableauProduits.length; i++) {
    if (tableauProduits[i]._id === nounoursId) {
        chosenTeddy = tableauProduits[i];
        idTeddy = i;
    }
}

//message pop-up
let messageUser = document.getElementById('message-user');
let close = document.getElementById('close');
function displayMessage(message) {
    document.getElementById('message-alert').textContent = message;
    messageUser.classList.add('appear');
}
function closeMessage() {
    messageUser.classList.remove('appear');
}
close.addEventListener('click', closeMessage);

//affichage des éléments du HTML
document.getElementById("product-image").innerHTML = '<img src="' + chosenTeddy.imageUrl + '"alt=ours en peluche"></img>';
document.getElementById("product-name").textContent = chosenTeddy.name;
document.getElementById("teddy-description").textContent = chosenTeddy.description;
document.getElementById("teddy-price").textContent = chosenTeddy.price*0.01 + " €";

//récupération des couleurs
let colorNav = document.getElementById("teddy-color");
let arrayColors = chosenTeddy.colors;
for (let ind = 0; ind < arrayColors.length; ind++) {
    colorNav.innerHTML += '<li tabindex="0" id="couleurTeddy' + ind + '">' + arrayColors[ind] + '</li>';
}

//recuperation de la couleur choisie par l'utilisateur
function addCouleur(index) {
    chosenTeddy.couleur = arrayColors[index];
    displayMessage('Vous avez sélectionné la couleur ' + arrayColors[index]);
}
for (let i = 0; i < arrayColors.length; i++) {
    let couleurEl = document.getElementById('couleurTeddy' + i);
    couleurEl.addEventListener('click', function () {
        addCouleur(i);
    });
}

//ajout du produit au localstorage en cliquant sur le panier dans la carte
function addProduct(produit) {
    if (tableauProduits[idTeddy].quantite >= 1) {
        tableauProduits[idTeddy].quantite ++;
    } else {
        tableauProduits[idTeddy].quantite = 1;
    }
    localStorage.setItem('tableauStorage', JSON.stringify(tableauProduits));
    displayMessage(produit + ' a été ajouté à votre panier');
}
let addToCart = document.getElementById('add-cart');
addToCart.addEventListener('click', function(){addProduct(product.textContent)});
let product = document.getElementById("product-name");


