let quantity = [];
let currentUser = [];
$(async function(){
    let email = sessionStorage.getItem('currentUserEmail');
    let items = [];

    // gets the current user
    async function getUser(){
        items = [];
        let people = await axios.get('/users');
        console.log(people)
        people.data.map(person=>{
            if(person.email == email){
                currentUser.push(person)
            }
        })
        console.log(currentUser)
        quantity = currentUser[0].quantity;
        // console.log(currentUser[0].cart.length)

        for(let i = 0; i < currentUser[0].cart.length; i++){
            items.push(`
                <div class="cartItem" id="cart${i}">
                    <div class="productInfoCont">
                        <p class="productInfo">
                            <img src="${currentUser[0].cart[i].images[0]}" alt="" class="productImage">
                        </p>
                        <p class="productInfo">${currentUser[0].cart[i].name}</p>
                        <p class="productInfo">${currentUser[0].cart[i].price}</p>
                        <p class="productInfo">
                            <select name="quantity" id="quantity${i}" class="quantity" onclick="changeQuantity(${i})">
                                <option value="1">1</option>
                                <option value="2">2</option>    
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="0">0</option>
                            </select>
                        </p>
                    </div>
                </div>
            `)
            // quantity.push(0);
            // console.log(quantity)
        }

        document.querySelector('.cartItems').innerHTML = items.join('');
    }
    await getUser();
    setValues();
    updatePrice();
})

function updatePrice(){
    let total = 0.00;
    // gets the users total price
    for(let i = 0; i < currentUser[0].cart.length; i++){
        let product = Number.parseFloat(Number(currentUser[0].balance[i]) * Number(currentUser[0].quantity[i]) * 1.056).toFixed(2);
        total += Number(product);
    }
    document.querySelector('#totalPrice').innerHTML = `$${Number.parseFloat(total).toFixed(2)}`;
}

// function to change the quantity of the item
async function changeQuantity(id){
    let email = sessionStorage.getItem('currentUserEmail');
    quantity[id] = document.querySelector(`#quantity${id}`).value;
    // console.log(quantity);
    await fetch(`/users/updateQuantity/${email}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({quantity: quantity}),
    })
    updatePrice();
}

function setValues(){
    // sets the dropdown quantity to the correct value
    for(let i = 0; i < quantity.length; i++) {
        // console.log('yes')
        // console.log($(`#quantity${i}`))
        // console.log(quantity[i])
        document.querySelector(`#quantity${i}`).value = `${quantity[i]}`;
    }
}

// checks the users info to make sure that it is correct
async function checkInfo(){
    let email = sessionStorage.getItem('currentUserEmail');
    let enteredEmail = document.querySelector('.email').value;
    let enteredCard = document.querySelector('.creditCard').value;

    // makes sure that the users info matches their data
    if(enteredEmail == currentUser[0].email && enteredCard == currentUser[0].card){
        console.log('matches')
        await fetch(`/users/resetCart/${email}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({quantity: [], cart: [], balance: []}),
        })
    }
}