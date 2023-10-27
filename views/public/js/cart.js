let quantity = [];
$(async function(){
    let email = sessionStorage.getItem('currentUserEmail');
    let currentUser = [];
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
                <div class="cartItem">
                    <div class="productInfoCont">
                        <p class="productInfo">
                            <img src="${currentUser[0].cart[i].images[0]}" alt="" class="productImage">
                        </p>
                        <p class="productInfo">${currentUser[0].cart[i].name}</p>
                        <p class="productInfo">${currentUser[0].cart[i].price}</p>
                        <p class="productInfo">
                            <select name="quantity" id="quantity${i}" class="quantity" onclick="changeQuantity(${i})">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>    
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </p>
                    </div>
                </div>
            `)
            // quantity.push(0);
            console.log(quantity)
        }

        document.querySelector('.cartItems').innerHTML = items.join('');
    }
    await getUser();
    setValues();
})

// function to change the quantity of the item
async function changeQuantity(id){
    let email = sessionStorage.getItem('currentUserEmail');
    quantity[id] = document.querySelector(`#quantity${id}`).value;
    console.log(quantity);
    await fetch(`/users/updateQuantity/${email}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({quantity: quantity}),
    })
}

function setValues(){
    // sets the dropdown quantity to the correct value
    for(let i = 0; i < quantity.length; i++) {
        console.log('yes')
        console.log($(`#quantity${i}`))
        console.log(quantity[i])
        document.querySelector(`#quantity${i}`).value = `${quantity[i]}`;
    }
}