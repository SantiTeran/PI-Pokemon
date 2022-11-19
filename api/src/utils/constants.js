const { API_KEY } = process.env
const URL_KEY = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

// console.log(URL_KEY)

module.exports = {URL_KEY};