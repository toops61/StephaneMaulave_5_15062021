let nounoursId = window.location.search.substring(4);
nounoursId = 'http://localhost:3000/api/teddies/' + nounoursId;

fetch(nounoursId)
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

let request = new XmlHttpRequest(nounoursId);
request.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        console.log(this.responseText);
		//les traitements à effectuer quand on a la réponse
	}
}
request.open("GET","/name");
request.send(null);

value.quantite = 1;
function addProduct(produit) {
    produit.quantite ++;
    productsArray.push(produit);
}
let productsArray = [];
let ajoutPanier = document.getElementById('add-cart').addEventListener('click', addProduct(value));

