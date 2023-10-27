let values;
$(function(){
    $('#search').on('keypress', function(e){
        console.log('key pressed')
        console.log(e.key)
        if(e.key == "Enter"){
            console.log('enter clicked')
        }
    })

    // gets the email of current user
    // let email = sessionStorage.getItem('currentUserEmail');

    // let values;

    let options = {
        method: 'GET',
        url: 'https://store-groceries.p.rapidapi.com/groceries/search/bread',
        headers: {
            'X-RapidAPI-Key': '380492f9b7msh20d59cdef807ed1p1e8de2jsn02e4e09b5a66',
            'X-RapidAPI-Host': 'store-groceries.p.rapidapi.com'
        }
    };

    async function getFood(){
        try {
            // gets all the data from the api
            const response = await axios.request(options);

            // gets the information that is needed
            values = response.data.map(item=>{
                let temp = [];
                // rounds prices to two decimal spots
                item.price.value = Math.round(((Number(item.price.value) * 1.22) + Number.EPSILON) * 100) / 100;
                console.log(item.images);
                // gets the images and assigns them to a temporary variable
                if(item.images != null){
                    for(let i = 0; i < item.images.length; i++){
                        temp.push(item.images[i].url);
                    }
                }
                // returns an array of useful information from the grocery item
                return {name: `${item.name}`, description: `${item.description}`, manufacturer: `${item.manufacturer}`, price: `$${item.price.value}`, images: temp};
            });
            let items = [];

            // adds first 21 items to the array
            for(let i = 0; i < 21; i+=3){
                items.push(`
                    <article class="row">
                        <div class="item" id="item${i}">
                            <div class="imageCont">
                                <img src="${values[i].images[0]}" alt="" class="image">
                            </div>
                            <div class="itemInformation">
                                <p><strong class="name">Name: ${values[i].name}</strong></p>
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
            console.log(values)
        } catch (error) {
            console.error(error);
        }
    }
    getFood();
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