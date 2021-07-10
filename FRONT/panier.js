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
    panierSection.innerHTML += '<div class="panier-resume__article"><div class="panier-resume__article__image" tabindex="0" id="article-image' + ind + '"></div><div class="panier-resume__article__details"><p tabindex="0" class="panier-resume__name">article : Ours en peluche ' + panierArray[ind].name + '</p><div><label for="quantite-produit' + ind + '" class="panier-resume__quantite">quantité : </label><input type="number" min="1" max="99" maxlength="2" value=' + panierArray[ind].quantite + ' id="quantite-produit' + ind + '"></div><div tabindex="0" class="panier-resume__supprimer"><p>supprimer</p></div></div><p tabindex="0" class="panier-resume__price" id="produit-price' + ind + '">' + produitPrice + ' €</p></div>';
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
        let quantite = Number(document.getElementById('quantite-produit' + index).value);
        if (quantite > 99) {
            quantite = 1;
            document.getElementById('quantite-produit' + index).value = 1;
            alert('Vous ne pouvez sélectionner plus de 99 ours');
        } else if (quantite < 0) {
            quantite = 1;
            document.getElementById('quantite-produit' + index).value = 1;
            alert('Vous ne pouvez sélectionner moins d\'un ours, mais vous pouvez le supprimer');
        }
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
}, 1000);

//tableau des produits de la commande
let totalArray = [];

function createArray() {
    for (let i = 0; i < panierArray.length; i++) {
        quantite = Number(document.getElementById('quantite-produit' + i).value);
        if (quantite > 0){
            for (let ind = 0; ind < quantite; ind++) {
                totalArray.push(panierArray[i]._id);            
            }
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

let regexText = /[0-9/=;`$&"()§!@≠…∞€ø«¡¶{}“º%µ¬®†°π‡∂ﬁƒ¬‹≈©◊ß£*#ë—<>≤≥]/;
let regexAdress = /[/=;`$&"()§!@≠…∞€ø«¡¶{}“ºµ¬%®†π‡∂ﬁƒ¬‹≈©◊ß£*#ë—<>≤≥]/;
let regexMail = /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]­{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/;
 
//regex exclu
function rejectInput(inputName, regex) {
    if (regex.exec(inputName.value) != null || inputName.value.length < 2) {
        inputName.classList.remove('valid');
        inputName.classList.add('invalid');
        inputName.valid = false;
    }
    else {
        inputName.classList.remove('invalid');
        inputName.classList.add('valid');
        inputName.valid = true;
    }
}
firstName.addEventListener('input', function(){
    rejectInput(firstName, regexText);
});
lastName.addEventListener('input', function(){
    rejectInput(lastName, regexText);
});
address.addEventListener('input', function(){
    rejectInput(address, regexAdress);
});
city.addEventListener('input', function(){
    rejectInput(city, regexAdress);
});

//Regex attendu
function expectInput(inputName, regex) {
    if (regex.exec(inputName.value) == null) {
        inputName.classList.remove('valid');
        inputName.classList.add('invalid');
        inputName.valid = false;
    }
    else {
        inputName.classList.remove('invalid');
        inputName.classList.add('valid');
        inputName.valid = true;
    }
}
email.addEventListener('input', function(){
    expectInput(email, regexMail);
});

//capture des champs du formulaire
let contact = {};
function takeInputs() {
    contact.firstName = firstName.value;
    contact.lastName = lastName.value;
    contact.address = address.value;
    contact.city = city.value;
    contact.email = email.value;
}

//crée un tableau de booléens true/false correspondant à chaque champ
function capturerChamps() {
    validInputArray = [];
    for (let index = 0; index < 5; index++) {
       validInputArray.push(inputsArray[index].valid);
    }
}

//déclenche la vérification des champs lors du click sur le bouton soumettre
let validButton = document.querySelector('form div#submit-btn input');
let isTrue = (currentValue) => currentValue === true;
function valider() {
        capturerChamps();
        if (validInputArray.every(isTrue) && panierArray.length > 0) {
            takeInputs();
            createArray();
            tableauProduits.push(totalPanier);
            localStorage.setItem('tableauStorage', JSON.stringify(tableauProduits));
            localStorage.setItem('contact', JSON.stringify(contact));
            localStorage.setItem('products', JSON.stringify(totalArray));
            location.href = './pageConfirm.html';
        } else if (panierArray.length === 0) {
            alert('Votre panier est vide');
        } else {
            alert('Impossible, vos champs ne sont pas correctement remplis');
        }
}
validButton.addEventListener('click', valider);
validButton.addEventListener('click', function(event) {
    event.preventDefault();
  }, false);