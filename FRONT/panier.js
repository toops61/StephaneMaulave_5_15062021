let productsId = Object.getOwnPropertyNames(localStorage);
let panierArray = [];
let totalPanier = 0;
let panierSection = document.getElementById('panier-section');

//creation d'un tableau de produits selectionnés pour le panier :
let tableauProduits = JSON.parse(localStorage.getItem('tableauStorage'));
for (let i = 0; i < tableauProduits.length; i++) {
    if (tableauProduits[i].quantite >= 1) {
        panierArray.push(tableauProduits[i]);
    }   
}

//mise en place des produits dans le panier
for (let ind = 0; ind < panierArray.length; ind++) {
    let produitPrice = panierArray[ind].price * 0.01 * panierArray[ind].quantite;
    let panierSection = document.getElementById('panier-section');
    panierSection.innerHTML += '<div class="panier-resume__article"><div class="panier-resume__article__image" tabindex="0" id="article-image' + ind + '"></div><div class="panier-resume__article__details"><p tabindex="0" class="panier-resume__name">article : Ours en peluche ' + panierArray[ind].name + '</p><label for="quantite-produit' + ind + '" class="panier-resume__quantite">quantité : </label><input type="number" min="1" max="99" value=' + panierArray[ind].quantite + ' id="quantite-produit' + ind + '"><div tabindex="0" class="panier-resume__supprimer"><p>supprimer</p></div></div><p tabindex="0" class="panier-resume__price" id="produit-price' + ind + '">' + produitPrice + ' €</p></div>';
    document.getElementById("article-image" + ind).innerHTML = '<img src="' + panierArray[ind].imageUrl + '"alt=ours en peluche"></img>';
    totalPanier += produitPrice;
}

//si le panier est vide, afficher message.
if (totalPanier === 0) {
    panierSection.innerHTML = '<p>votre panier est vide</p>';
} else {
    panierSection.innerHTML += '<p tabindex="0" id="total-price">total : ' + totalPanier + ' €</p>';
}


//recalcule les totaux si la quantite change
function updatePrice() {
    totalPanier = 0;
    for (let index = 0; index < panierArray.length; index++) {
        let quantite = document.getElementById('quantite-produit' + index).value;
        let prix = document.getElementById('produit-price' + index);
        let price = panierArray[index].price * .01;
        totalPanier += price;
        prix.textContent = price * quantite + ' €';
        totalPanier += price * quantite - price;
        for (let i = 0; i < tableauProduits.length; i++) {
            if (tableauProduits[i].name === panierArray[index].name) {
                tableauProduits[i].quantite = quantite;
            }       
        }
    };
    document.getElementById('total-price').textContent = 'total : ' + totalPanier + ' €';
    localStorage.setItem('tableauStorage', JSON.stringify(tableauProduits));
}

//prends en compte les évènements de click sur quantité ou/et supprimer
setTimeout(function() {
    for (let index = 0; index < panierArray.length; index++) {
        let input = document.querySelectorAll('section input')[index];
        input.addEventListener('click', updatePrice);
        input.addEventListener('input', updatePrice);
        let supprime = document.querySelectorAll('section div.panier-resume__supprimer')[index];
        supprime.addEventListener('click', supprimeArticle);
        function supprimeArticle() {
            document.getElementById('quantite-produit' + index).value = 0;
            let supDiv = document.getElementsByClassName('panier-resume__article')[index];
            supDiv.style.display = ('none');
            updatePrice();
            
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