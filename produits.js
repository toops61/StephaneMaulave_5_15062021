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
                document.getElementById("teddy-price" + i).textContent = value[i].price*0.01 + " €";
            }   
        })
        .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });