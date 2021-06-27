fetch('http://localhost:3000/api/teddies')
        .then(function(res) {
            if(res.ok) {
                const productsArray = res.json();
                return productsArray;
            }
        })
        .then(function(value) {
                let teddy = value[0];
                document.getElementById("product-name").textContent = teddy.name;
                document.getElementById("teddy-description").textContent = teddy.description;
                let colorNav = document.getElementById("teddy-color");
                let arrayColors = teddy.colors;
                for (let ind = 0; ind < arrayColors.length; ind++) {
                    let objectColor = document.createElement("li");
                    objectColor.innerHTML = arrayColors[ind];
                    colorNav.appendChild(objectColor);
                document.getElementById("teddy-price").textContent = teddy.price*0.01 + " €";
            }   
        })
        .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });