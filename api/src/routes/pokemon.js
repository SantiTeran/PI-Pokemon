const { Router } = require('express');
const { getPokemons, createPokemon, getPokemonById, deletePokemon } = require('../controller/pokemonC');

const router = Router();

router.get('/pokemons', getPokemons);
router.get('/pokemons/:id', getPokemonById);
router.post('/pokemons', createPokemon);
router.delete("/delete/:id", deletePokemon)


module.exports = router;