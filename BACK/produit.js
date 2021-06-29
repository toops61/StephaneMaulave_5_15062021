//recuperation de ID objet via URL
let nounoursId = window.location.search.substring(4);
nounoursIdUrl = 'http://localhost:3000/api/teddies/' + nounoursId;

//promise pour l'affichage dynamique du produit
fetch(nounoursIdUrl)
        .then(function(res) {
            if(res.ok) {
                const chosenTeddy = res.json();
                return chosenTeddy;
            }
        })
        .then(function(value) {
            document.getElementById("product-image").innerHTML = '<img src="' + value.imageUrl + '"alt=ours en peluche"></img>';
            document.getElementById("product-name").textContent = value.name;
            document.getElementById("teddy-description").textContent = value.description;
            let colorNav = document.getElementById("teddy-color");
            let arrayColors = value.colors;
            for (let ind = 0; ind < arrayColors.length; ind++) {
                let objectColor = document.createElement("li");
                objectColor.innerHTML = arrayColors[ind];
                colorNav.appendChild(objectColor);
            document.getElementById("teddy-price").textContent = value.price*0.01 + " €";
            }   
        })
        .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });

//ajout du produit au localstorage en cliquant sur le panier dans la carte
function addProduct(produit) {
    localStorage.setItem(nounoursId, produit);
    alert(produit + ' a été ajouté à votre panier')
}
let addToCart = document.getElementById('add-cart');
addToCart.addEventListener('click', function(){addProduct(product.innerText)});
let product = document.getElementById("product-name");

