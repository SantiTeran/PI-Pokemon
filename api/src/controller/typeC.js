// const axios = require('axios');
const { Type } = require('../db');
// const {TYPE} = require ('../utils/constants')
const {getAllPokemons} = require("../controller/pokemonC")


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
}

// const createType = async (req, res) => {
//   const {name} = req.body
//   try {
//     const newType = await Type.create({
//       name
//     })
//     res.send('new Type created')
//   } catch (error) {
//     console.log("type not created", error)
//   }
// }

module.exports = {
    getTypes,
    // createType,
};
