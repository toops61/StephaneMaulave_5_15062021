fetch('http://localhost:3000/api/teddies')
        .then(function(res) {
            if(res.ok) {
                const productsArray = res.json();
                return productsArray;
            }
        })
        .then(function(value) {
                document.getElementById("teddy-name1").textContent = value[0].name;
                document.getElementById("teddy-description1").textContent = "couleurs disponibles : " + value[0].colors;
                document.getElementById("teddy-name2").textContent = value[1].name;
                document.getElementById("teddy-description2").textContent = "couleurs disponibles : " + value[1].colors;
                document.getElementById("teddy-name3").textContent = value[2].name;
                document.getElementById("teddy-description3").textContent = "couleurs disponibles : " + value[2].colors;
                document.getElementById("teddy-name4").textContent = value[3].name;
                document.getElementById("teddy-description4").textContent = "couleurs disponibles : " + value[3].colors;
                document.getElementById("teddy-name5").textContent = value[4].name;
                document.getElementById("teddy-description5").textContent = "couleurs disponibles : " + value[4].colors;
        })
        .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });