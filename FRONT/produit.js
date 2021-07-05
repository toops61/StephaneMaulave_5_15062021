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

//recuperation des donnes pour le HTML
document.getElementById("product-image").innerHTML = '<img src="' + chosenTeddy.imageUrl + '"alt=ours en peluche"></img>';
document.getElementById("product-name").textContent = chosenTeddy.name;
document.getElementById("teddy-description").textContent = chosenTeddy.description;
let colorNav = document.getElementById("teddy-color");
let arrayColors = chosenTeddy.colors;
for (let ind = 0; ind < arrayColors.length; ind++) {
    let objectColor = document.createElement("li");
    objectColor.innerHTML = arrayColors[ind];
    colorNav.appendChild(objectColor);
document.getElementById("teddy-price").textContent = chosenTeddy.price*0.01 + " €";
}

//ajout du produit au localstorage en cliquant sur le panier dans la carte

function addProduct(produit) {
    if (tableauProduits[idTeddy].quantite >= 1) {
        tableauProduits[idTeddy].quantite ++;
    } else {
        tableauProduits[idTeddy].quantite = 1;
    }
    alert(produit + ' a été ajouté à votre panier');
}
let addToCart = document.getElementById('add-cart');
addToCart.addEventListener('click', function(){addProduct(product.textContent)});
let product = document.getElementById("product-name");


