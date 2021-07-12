// appel de l'API et stockage du tableau resultant
fetch('http://localhost:3000/api/teddies')
        .then(function(res) {
            if(res.ok) {
                const productsArray = res.json();
                return productsArray;
            }
        })
        .then(function(value) {
            tableauProduits = value;
        })
        .catch(function(error) {
            document.querySelector('main article h1').textContent = 'désolé, il y a eu un problème lors du chargement';
            document.querySelector('footer').style.display = 'none';
            console.log('Il y a eu un problème : ' + error.message);
        });

//loader pendant le chargement de la page
/* const loader = document.querySelector('div.loader');
window.addEventListener('load', function(){
    loader.className += " hidden";
}) */

//loader de 3,5 secondes
const loader = document.querySelector('div.loader');
setTimeout(function () {
    loader.className += " hidden";
}, 3500)

setTimeout(function() {
    for (let i = 0; i < tableauProduits.length; i++) {
        let productSection = document.getElementById('productsSection');
        productSection.innerHTML += '<div class="products__card"><div class="products__card__image" tabindex="0" id="teddy-image' + i + '"></div><div class="products__card__description"><h2 tabindex="0" id="teddy-name' + i + '"></h2><a href="./produit.html?id=' + tableauProduits[i]._id + '" id="lien-product' + i + '"><div class="plus"><div></div></div></a><div class="cart-prix"><div class="add-cartIndex" tabindex="0"><div class=add-cartIndex__icon id="add-to-cart' + i + '"></div></div><p tabindex="0" id="teddy-price' + i + '"></p></div></div></div>';
        document.getElementById("teddy-image" + i).innerHTML = '<img src="' + tableauProduits[i].imageUrl + '"alt=ours en peluche"></img>';
        document.getElementById("teddy-name" + i).textContent = tableauProduits[i].name;
        document.getElementById("teddy-price" + i).textContent = tableauProduits[i].price*0.01 + " €";
    }
},4000);

//fonction update du local storage et du tableau des produits
setTimeout(function() {
    if (localStorage.length === 0) {
        storeToLocal();
    } else {
        recupLocal();
    }
}, 4000);

function storeToLocal() {
    localStorage.setItem('tableauStorage', JSON.stringify(tableauProduits)); 
}
function recupLocal() {
    tableauProduits = JSON.parse(localStorage.getItem('tableauStorage'));
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

//evenement click pour ajouter l'élément au panier
setTimeout(function() {
    for (let ind = 0; ind < tableauProduits.length; ind++) {
            let addToCart = document.getElementById('add-to-cart' + ind);
            addToCart.addEventListener('click', function(){addProduct(ind)});
    }
}, 4000);

//fonction pour l'ajout du produit au panier
function addProduct(index) {
    if (tableauProduits[index].quantite >= 1) {
        tableauProduits[index].quantite ++;
    } else {
        tableauProduits[index].quantite = 1;
    }
    storeToLocal();
    if (tableauProduits[index].name.indexOf(' ') > -1) {
        displayMessage(tableauProduits[index].name + ' ont été ajoutés à votre panier');
    } else
    displayMessage(tableauProduits[index].name + ' a été ajouté à votre panier');
}