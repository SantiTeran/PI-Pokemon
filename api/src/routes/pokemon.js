const { Router } = require('express');
const { getPokemons, createPokemon, getPokemonById } = require('../controller/pokemonC');

const router = Router();

router.get('/pokemons', getPokemons);
router.get('/pokemons/:id', getPokemonById);
router.post('/pokemons', createPokemon);

module.exports = router;