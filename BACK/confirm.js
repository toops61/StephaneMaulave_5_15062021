const url = 'http://localhost:3000/api/teddies/order';
fetch(url)
.then(function(res) {
    if(res.ok) {
        let product = res.json();
        return product;
    }
})
.then(function(value) {
 console.log(value);
})
.catch(function(error) {
    console.log('Il y a eu un problème, essayer ultérieurement: ' + error.message);
});