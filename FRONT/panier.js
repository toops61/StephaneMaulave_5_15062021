let submit = document.getElementById('submit-btn');

function validPanier() {
    alert('Merci pour votre commande');
}

submit.addEventListener('click', validPanier);

fetch('http://localhost:3000/api/teddies')
    .then(function(res) {
        if(res.ok) {
            const productsArray = res.json();
            return productsArray;
        }
    })
    .then(function(value) {
        
        }   
    })
    .catch(function(error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    });