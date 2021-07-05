let productsId = Object.getOwnPropertyNames(localStorage);
let panierArray = [];
let totalPanier = 0;
let panierSection = document.getElementById('panier-section');

//recuperation de chaque produit stocké dans le local storage pour affichage
const tableauProduits = JSON.parse(localStorage.getItem('tableauStorage'));

for (let i = 0; i < productsId.length; i++) {
    fetch('http://localhost:3000/api/teddies/' + productsId[i])
        .then(function(res) {
            if(res.ok) {
                let product = res.json();
                return product;
            }
        })
        .then(function(value) {
            let produit = {
                name: value.name,
                quantite: 1,
                prix: value.price,
                image: value.imageUrl
            };
            panierArray.push(produit);
            return panierArray;            
        })
        .then(function(produits) {
            let produitPrice = produits[i].prix * 0.01;
            let panierSection = document.getElementById('panier-section');
            panierSection.innerHTML += '<div class="panier-resume__article"><div class="panier-resume__article__image" tabindex="0" id="article-image' + i + '"></div><div class="panier-resume__article__details"><p tabindex="0" class="panier-resume__name">article : Ours en peluche ' + produits[i].name + '</p><label for="quantite-produit' + i + '" class="panier-resume__quantite">quantité : </label><input type="number" min="1" max="99" value="1" id="quantite-produit' + i + '"><div tabindex="0" class="panier-resume__supprimer"><p>supprimer</p></div></div><p tabindex="0" class="panier-resume__price" id="produit-price' + i + '">' + produitPrice + ' €</p></div>';
            document.getElementById("article-image" + i).innerHTML = '<img src="' + produits[i].image + '"alt=ours en peluche"></img>';
            totalPanier += produitPrice;
            return totalPanier;
        })
        .catch(function(error) {
            console.log('Il y a eu un problème, essayer ultérieurement: ' + error.message);
        });
}

setTimeout(function() {
    if (totalPanier === 0) {
        panierSection.innerHTML = '<p>votre panier est vide</p>';
    } else {
        panierSection.innerHTML += '<p tabindex="0" id="total-price">total : ' + totalPanier + ' €</p>';
    }
}, 500);

//recalcule les totaux si la quantite change
function updatePrice() {
    totalPanier = 0;
    for (let ind = 0; ind < panierArray.length; ind++) {
        let quantite = document.getElementById('quantite-produit' + ind).value;
        let prix = document.getElementById('produit-price' + ind);
        let price = panierArray[ind].prix * .01;
        totalPanier += price;
        prix.textContent = price * quantite + ' €';
        totalPanier += price * quantite - price;
    };
    document.getElementById('total-price').textContent = 'total : ' + totalPanier + ' €';
}

//prends en compte les évènements de click sur quantité ou/et supprimer
setTimeout(function() {
    for (let index = 0; index < panierArray.length; index++) {
        let input = document.querySelectorAll('section input')[index];
        input.addEventListener('click', updatePrice);
        let supprime = document.querySelectorAll('section div.panier-resume__supprimer')[index];
        supprime.addEventListener('click', supprimeArticle);
        function supprimeArticle() {
            document.getElementById('quantite-produit' + index).value = 0;
            let supDiv = document.getElementsByClassName('panier-resume__article')[index];
            supDiv.style.display = ('none');
            updatePrice();
            localStorage.removeItem(productsId[index]);
        }
    }
}, 2000);

//tableau des produits de la commande
let totalArray = [];
let quantite = 1;
function createArray() {
    for (let i = 0; i < panierArray.length; i++) {
        quantite = document.getElementById('quantite-produit' + i).value;
        let finalProduct = {
            name: panierArray[i].name,
            totalProduct: panierArray[i].prix * .01 * quantite
        }
        if (quantite > 0){
        totalArray.push(finalProduct);
        }
    }
}


//formulaire vérification des champs
let inputsArray = document.querySelectorAll('form input');
let firstName = inputsArray[0];
let lastName = inputsArray[1];
let address = inputsArray[2];
let city = inputsArray[3];
let email = inputsArray[4];

/* function isValid(value) {
    return /^e[0-9]{3,}$/.test(value);
}
myInput.addEventListener('input', function(e) {
    var value = e.target.value;
    if (value.startsWith('Hello ')) {
        isValid = true;
    } else {
        isValid = false;
    }
}); */

//capture des champs du formaulaire
let panierContact = {};
function takeInputs() {
    panierContact.firstName = firstName.value;
    panierContact.lastName = lastName.value;
    panierContact.address = address.value;
    panierContact.city = city.value;
    panierContact.email = email.value;
}

//validation de la commande
let validButton = document.querySelector('form div#submit-btn input');
validButton.addEventListener('click', createArray);
validButton.addEventListener('click', takeInputs);

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