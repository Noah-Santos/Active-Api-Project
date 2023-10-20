const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://store-groceries.p.rapidapi.com/groceries/search/coffee',
  headers: {
    'X-RapidAPI-Key': '380492f9b7msh20d59cdef807ed1p1e8de2jsn02e4e09b5a66',
    'X-RapidAPI-Host': 'store-groceries.p.rapidapi.com'
  }
};

let values;

async function getFood(){
    try {
        // gets all the data from the api
        const response = await axios.request(options);
        values = response.data.map(item=>{
            let temp = [];
            item.price.value = Number(item.price.value) * 1.22
            // gets the images and assigns them to a temporary variable
            for(let i = 0; i < item.images.length; i++){
                temp.push(item.images[i].url);
            }
            // returns an array of useful information from the grocery item
            return [`Name: ${item.name}`,`Description: ${item.description}`,`Manufacturer: ${item.manufacturer}`,`Price: $${item.price.value}`,temp]
        });
        console.log(values);
        // console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

getFood();