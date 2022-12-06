const axios = require('axios')
const {Pokemon, Type} = require('../db')
const {POKEMONS, POKEMON_ID} = require('../utils/constants')

const getInfoApi = async () => {
    try {
      const primerosPokemon = await axios.get(
        "https://pokeapi.co/api/v2/pokemon"
      );
      const segundosPokemon = await axios.get(primerosPokemon.data.next);
      const todosPokemon = primerosPokemon.data.results.concat(
        segundosPokemon.data.results
      );
      const infoPokemons = await Promise.all(
        todosPokemon.map(async (pokemon) => {
          let infoDePokemon = await axios.get(pokemon.url);
          return {
            id: infoDePokemon.data.id,
            name: infoDePokemon.data.name,
            hp: infoDePokemon.data.stats[0].base_stat,
            attack: infoDePokemon.data.stats[1].base_stat,
            defense: infoDePokemon.data.stats[2].base_stat,
            speed: infoDePokemon.data.stats[5].base_stat,
            height: infoDePokemon.data.height,
            weight: infoDePokemon.data.weight,
            image: infoDePokemon.data.sprites.other.dream_world.front_default,
            types: infoDePokemon.data.types.map((t) => t.type.name),
          };
        })
      );
      return infoPokemons;
    } catch (error) {
      console.log("entre al error del getinfoapi", error);
    }
  };
  
  const getInfoDb = async () => {
    const pokemonsDB = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  
    const pokemonsMapeados = pokemonsDB?.map((pokemon) => {
      const { types } = pokemon;
      const pokemonData = {
        ...pokemon.dataValues,
        types: types.map((t) => t.name),
      };
      return pokemonData;
    });
    return pokemonsMapeados;
  };
  
  const getAllPokemons = async () => {
    try {
      const apiInfo = await getInfoApi();
      const dbInfo = await getInfoDb();
      const allInfo = dbInfo.concat(apiInfo);
      return allInfo;
    } catch (error) {
      console.log("entre al error del getAllPokemons", error);
    }
  };

const getPokemons = async (req, res) => {
    try {
        const { name } = req.query;
        const allPokemons = await getAllPokemons();
    
        if (name) {
          const pokemonName = allPokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(name.toLowerCase())
          );
          if (pokemonName.length > 0) {
            res.status(200).send(pokemonName);
          } else {
            res.status(400).send("Pokemon not found");
          }
        } else {
          res.status(200).send(allPokemons);
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };

const getPokemonById = async (req, res) => {
    try {
        const { id } = req.params;
        const getById = await getAllPokemons();
    
        if (id) {
          const pokemonById = getById.filter(
            (pokemon) => pokemon.id.toString() === id
          );
    
          if (pokemonById) {
            res.status(200).json(pokemonById);
          } else {
            res
              .status(404)
              .send("No se encontró ningun pokemon en all pokemons con el id");
          }
        } else {
          res.status(404).send("No se encontró el id por params");
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };

const createPokemon = async (req, res) => {
    const { hp, attack, defense, speed, height, weight, image, type1, type2 } =
    req.body;
  let name = req.body.name.toLowerCase();
  let pokemon = {
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    image,
  };
  try {
    let createdPokemon = await Pokemon.create(pokemon);
    const addType1 = await createdPokemon.addType(type1, {
      through: "pokemon_type",
    });
    const addType2 = await createdPokemon.addType(type2, {
      through: "pokemon_type",
    });
    return res.status(200).send("El pokemon ha sido creado correctamente");
    }catch(error){
        console.log(error);
    }
};

module.exports = {
    getAllPokemons,
    getPokemons,
    createPokemon,
    getPokemonById,
};