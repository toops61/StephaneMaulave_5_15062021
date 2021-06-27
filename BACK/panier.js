fetch('http://localhost:3000/api/teddies')
    .then(function(res) {
        if(res.ok) {
            const panierArray = res.json();
            return panierArray;
        }
    })
    .then(function(value) {
        let totalPanier = 0;
        let articlesPanier = value;   
        let panierSection = document.getElementById('panier-section');    
        for (let i = 0; i < articlesPanier.length; i++) {
            let produitPrice = value[i].price * 0.01;
            panierSection.innerHTML += '<div class="panier-resume__article"><div class="panier-resume__article__image" id="article-image' + i + '"></div><div class="panier-resume__article__details"><p class="panier-resume__name">article : Ours en peluche ' + value[i].name + '</p><p class="panier-resume__quantite">quantité : <input type="number" min="1" max"99" value="1" id="quantite-produit"></p><div class="panier-resume__supprimer"><p>supprimer</p></div></div><p class="panier-resume__price" id="produit-price">' + produitPrice + ' €</p></div>';
            document.getElementById("article-image" + i).innerHTML = '<img src="' + value[i].imageUrl + '"alt=ours en peluche"></img>';
            let produitQuantite = document.getElementById('quantite-produit').value;
            produitPrice = produitPrice * produitQuantite;
            totalPanier += produitPrice;
        }
        panierSection.innerHTML += '<p id="total-price">total : </p>';
        document.getElementById('total-price').innerHTML += totalPanier;
    })
    .catch(function(error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    });

let submit = document.getElementById('submit-btn');

function validPanier() {
    alert('Merci pour votre commande');
}

submit.addEventListener('click', validPanier);

