let values;
let options;

async function getFood(){
    try {
        console.log('run')
        // gets all the data from the api
        const response = await axios.request(options);
        console.log(response)
        let test = 0;

        // gets the information that is needed
        values = response.data.map(item=>{
            
            let temp = [];
            console.log(test)
            // console.log(item.price.value)
            if(item.price){
                // rounds prices to two decimal spots
                item.price.value = Math.round(((Number(item.price.value) * 1.22) + Number.EPSILON) * 100) / 100;
            }
            
            // gets the images and assigns them to a temporary variable
            if(item.images != null){
                for(let i = 0; i < item.images.length; i++){
                    temp.push(item.images[i].url);
                }
            }
            // returns an array of useful information from the grocery item
            if(item.price){
                return {name: `${item.name}`, description: `${item.description}`, manufacturer: `${item.manufacturer}`, price: `$${item.price.value}`, images: temp};
            }
        });
        let items = [`
            <div class="searchCont">
                <input type="text" placeholder="Enter Product" id="searchBar">
                <button id="searchButton" onclick="search()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.612 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3l-1.4 1.4ZM9.5 14q1.875 0 3.188-1.313T14 9.5q0-1.875-1.313-3.188T9.5 5Q7.625 5 6.312 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14Z" />
                    </svg>
                </button>
            </div>
        `];

        // adds first 21 items to the array
        for(let i = 0; i < 21; i+=3){
            items.push(`
                <article class="row">
                    <div class="item" id="item${i}">
                        <div class="imageCont">
                            <img src="${values[i].images[0]}" alt="" class="image">
                        </div>
                        <div class="itemInformation">
                            <p><strong class="name">${values[i].name}</strong></p>
                            <p class="price">Price: ${values[i].price}</ class="price"></p>
                            <button class="addCart" id="b${i}" onclick="addToCart(${i})">Cart</button>
                        </div>
                    </div>

                    <div class="item" id="item${i+1}">
                        <div class="imageCont">
                            <img src="${values[i+1].images[0]}" alt="" class="image">
                        </div>
                        <div class="itemInformation">
                            <p><strong class="name">Name: ${values[i+1].name}</strong></p>
                            <p class="price">Price: ${values[i+1].price}</ class="price"></p>
                            <button class="addCart" id="b${i+1}" onclick="addToCart(${i+1})">Cart</button>
                        </div>
                    </div>

                    <div class="item" id="item${i+2}">
                        <div class="imageCont">
                            <img src="${values[i+2].images[0]}" alt="" class="image">
                        </div>
                        <div class="itemInformation">
                            <p><strong class="name">Name: ${values[i+2].name}</strong></p>
                            <p class="price">Price: ${values[i+2].price}</ class="price"></p>
                            <button class="addCart" id="b${i+2}" onclick="addToCart('${i+2}')">Cart</button>
                        </div>
                    </div>
                </article>
            `)
        }

        // adds items to the page
        document.querySelector('.shoppingItems').innerHTML = items.join('');
        test++;
    } catch (error) {
        console.error(error);
    }
}


// searches for the users item
async function search(){
    try{
        let product = document.querySelector('#searchBar').value;
        options = {
            method: 'GET',
            url: `https://store-groceries.p.rapidapi.com/groceries/search/${product}`,
            headers: {
                'X-RapidAPI-Key': '380492f9b7msh20d59cdef807ed1p1e8de2jsn02e4e09b5a66',
                'X-RapidAPI-Host': 'store-groceries.p.rapidapi.com'
            }
        };
        getFood();
    }catch(err){
        console.log(err);
        document.querySelector('.shoppingItems').innerHTML = '<p>Item not found. Please enter another one</p>';
    }
}

// searches when the enter button is clicked
$('#searchBar').on('keypress', function(e){
    if(e.key == "Enter"){
        console.log('search')
        try{
            let product = document.querySelector('#searchBar').value;
            console.log(product);
            options = {
                method: 'GET',
                url: `https://store-groceries.p.rapidapi.com/groceries/search/${product}`,
                headers: {
                    'X-RapidAPI-Key': '380492f9b7msh20d59cdef807ed1p1e8de2jsn02e4e09b5a66',
                    'X-RapidAPI-Host': 'store-groceries.p.rapidapi.com'
                }
            };
            getFood();
        }catch(err){
            console.log(err);
            document.querySelector('.shoppingItems').innerHTML = '<p>Item not found. Please enter another one</p>';
        }
    }
})


// adds item to cart
async function addToCart(id){
    let currentEmail = sessionStorage.getItem('currentUserEmail');
    // console.log(currentEmail);
    let cart = values[id];
    let balance = values[id].price;
    balance = balance.split('$')
    // console.log(cart)
    await fetch(`/users/updateCart/${currentEmail}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({cart:cart, balance:balance[1]}),
    })
    // console.log('added to cart');
}