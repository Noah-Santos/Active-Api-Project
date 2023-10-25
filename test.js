const axios = require('axios');

const option = {
  method: 'GET',
  url: 'https://store-groceries.p.rapidapi.com/groceries/search/coffee',
  headers: {
    'X-RapidAPI-Key': '380492f9b7msh20d59cdef807ed1p1e8de2jsn02e4e09b5a66',
    'X-RapidAPI-Host': 'store-groceries.p.rapidapi.com'
  }
};

let values;


const options = {
  method: 'GET',
  url: 'https://dawn2k-random-german-profiles-and-names-generator-v1.p.rapidapi.com/',
  params: {
    format: 'json',
    cc: 'all',
    ip: 'a',
    phone: 'l,t,o',
    count: '1',
    images: '1'
  },
  headers: {
    'X-RapidAPI-Key': '380492f9b7msh20d59cdef807ed1p1e8de2jsn02e4e09b5a66',
    'X-RapidAPI-Host': 'dawn2k-random-german-profiles-and-names-generator-v1.p.rapidapi.com'
  }
};



async function getFood(){
    try {
        // gets all the data from the api
        const response = await axios.request(option);
        values = response.data.map(item=>{
            let temp = [];
            item.price.value = Number(item.price.value) * 1.22
            // gets the images and assigns them to a temporary variable
            for(let i = 0; i < item.images.length; i++){
                temp.push(item.images[i].url);
            }
            // returns an array of useful information from the grocery item
            return {name: `${item.name}`, description: `${item.description}`, manufacturer: `${item.manufacturer}`, price: `$${item.price.value}`, images: `${temp}`};
        });
        console.log(values);
        // console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

// getFood();

async function getStuff(){
    try {
        const response = await axios.request(options);
        console.log(response.data);
        let cards = [];
    } catch (error) {
        console.error(error);
    }
}

getStuff();