$(async function(){
    let quantity = [];
    let currentUser = [];
    let total = 0.00;
    let email = sessionStorage.getItem('currentUserEmail');

    // gets the current user
    async function getUser(){
        let people = await axios.get('/users');
        console.log(people)
        people.data.map(person=>{
            if(person.email == email){
                currentUser.push(person)
            }
        })
        console.log(currentUser)
        quantity = currentUser[0].quantity;
    }

    await getUser();
    // updates the total price for the user
    for(let i = 0; i < currentUser[0].cart.length; i++){
        let product = Number.parseFloat(Number(currentUser[0].balance[i]) * Number(currentUser[0].quantity[i]) * 1.056).toFixed(2);
        total += Number(product);
    }
    document.querySelector('#balance').innerHTML = `Balance: $${total}`;
})
