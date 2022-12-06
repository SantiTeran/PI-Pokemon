const axios = require('axios');
const { Type } = require('../db');
const {getAllPokemons} = require('./pokemonC')
const {TYPE} = require ('../utils/constants')

const getTypes = async (req, res) => {
    try {
        const cantidadTypes = await Type.count();
        if (!cantidadTypes) {
          console.log("los tuve que crear");
          const allMyPokemons = await getAllPokemons();
          const pokemonTypes = allMyPokemons.map((pokemon) => pokemon.types);
          const myTypes = pokemonTypes.flat(); 
          const mySetTypes = [...new Set(myTypes)]; 
        
          mySetTypes.forEach((type) => {
            Type.findOrCreate({ where: { name: type } }); 
          });
          const theTypes = await Type.findAll();
          res.status(200).send(theTypes);
        } else {
          console.log("ya los tenia asi que no los cree");
          
          const theTypes = await Type.findAll();
          res.status(200).send(theTypes);
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };

module.exports = {
    getTypes,
};
