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

function addProduct(produit) {
    localStorage.setItem(nounoursId, produit);
}
let addToCart = document.getElementById('add-cart');
addToCart.addEventListener('click', function(){addProduct(product.innerText)});
let product = document.getElementById("product-name");

//localStorage.clear();
/*let request = new XMLHttpRequest('http://localhost:3000/api/teddies/order');
request.open('post', 'http://localhost:3000/api/teddies/order');
request.send(productsArray);
request.onreadystatechange = function(){
    if(this.readyState === 4 && this.status == 200){
        console.log('ça marche ?');
		//les traitements à effectuer quand on a la réponse
	}
} */




/*
value.quantite = 1;
 */

