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
//loader de 4 secondes
const loader = document.querySelector('div.loader');
setTimeout(function () {
    loader.className += " hidden";
}, 4000)

setTimeout(function() {
    for (let i = 0; i < tableauProduits.length; i++) {
        let productSection = document.getElementById('productsSection');
        productSection.innerHTML += '<a href="./produit.html?id=' + tableauProduits[i]._id + '" id="lien-product' + i + '"><div class="products__card"><div class="products__card__image" tabindex="0" id="teddy-image' + i + '"></div><div class="products__card__description"><h2 tabindex="0" id="teddy-name' + i + '"></h2><p tabindex="0" id="teddy-price' + i + '"></p></div></div></a>';
        document.getElementById("teddy-image" + i).innerHTML = '<img src="' + tableauProduits[i].imageUrl + '"alt=ours en peluche"></img>';
        document.getElementById("teddy-name" + i).textContent = tableauProduits[i].name;
        document.getElementById("teddy-price" + i).textContent = tableauProduits[i].price*0.01 + " €";
    }
},4000);
