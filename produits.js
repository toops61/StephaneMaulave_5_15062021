fetch('http://localhost:3000/api/teddies')
        .then(function(res) {
            if(res.ok) {
                const productsArray = res.json();
                return productsArray;
            }
        })
        .then(function(value) {
            for (let i = 0; i < value.length; i++) {
                document.getElementById("teddy-name" + i).textContent = value[i].name;
                document.getElementById("teddy-description" + i).textContent = value[i].description;
                let colorNav = document.getElementById("teddy-color" + i);
                let arrayColors = value[i].colors;
                for (let ind = 0; ind < arrayColors.length; ind++) {
                    let objectColor = document.createElement("li");
                    objectColor.innerHTML = arrayColors[ind];
                    colorNav.appendChild(objectColor);
                }
                document.getElementById("teddy-price" + i).textContent = value[i].price*0.01 + " €";
            }   
        })
        .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });