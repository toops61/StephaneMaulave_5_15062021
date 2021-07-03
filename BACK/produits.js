fetch('http://localhost:3000/api/teddies')
        .then(function(res) {
            if(res.ok) {
                const productsArray = res.json();
                return productsArray;
            }
        })
        .then(function(value) {          
            for (let i = 0; i < value.length; i++) {
                let productSection = document.getElementById('productsSection');
                productSection.innerHTML += '<a href="./produit.html?id=' + value[i]._id + '" id="lien-product' + i + '"><div class="products__card"><div class="products__card__image" tabindex="0" id="teddy-image' + i + '"></div><div class="products__card__description"><h2 tabindex="0" id="teddy-name' + i + '"></h2><p tabindex="0" id="teddy-price' + i + '"></p></div></div></a>';
                document.getElementById("teddy-image" + i).innerHTML = '<img src="' + value[i].imageUrl + '"alt=ours en peluche"></img>';
                document.getElementById("teddy-name" + i).textContent = value[i].name;
                document.getElementById("teddy-price" + i).textContent = value[i].price*0.01 + " €";
            }   
        })
        .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });

