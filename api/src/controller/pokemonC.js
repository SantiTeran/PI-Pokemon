const axios = require('axios')
const {Pokemon, Type} = require('../db')
const {POKEMON} = require('../utils/constants')

let dbId = 40;

const getInfoApi = async () => {
    try {
      const primerosPokemon = await axios.get(POKEMON);
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
      try {
        const {
          name,
          hp,
          attack,
          defense,
          speed,
          height,
          weight,
          image,
          types,
          created,
        } = req.body;
    
        let urlDeImagen = "";
    
        if (image) {
          urlDeImagen = image;
        } else {
          urlDeImagen =
            "https://assets.pokemon.com/assets/cms2/img/watch-pokemon-tv/seasons/season01/season01_ep35_ss01.jpg";
        }
    
        if (name && types.length) {
          const createPokemon = await Pokemon.create({
            id: ++dbId,
            name,
            hp,
            attack,
            defense,
            speed,
            height: Number(height),
            weight: Number(weight),
            image: urlDeImagen,
            created,
          });
    
          const typeDb = await Type.findAll({
            where: { name: types },
          });
    
          createPokemon.addType(typeDb);
          res.status(200).send("Pokemon creado con exito");
        } else {
          res.status(400).send("Faltaron datos para crear el pokemon");
        }
      } catch (error) {
        console.log("entre al error del post", error);
      }
    };

const deletePokemon = async (req, res) => {
  const { id } = req.params;
  try {
    const pokemonDelete = await Pokemon.findByPk(id);
    if (!pokemonDelete) {
      res.status(400).send("No existe el pokemon que deseas eliminar");
    } else {
      pokemonDelete.destroy();
      return res.status(200).send("Pokemon eliminado correctamente");
    }
  } catch (error) {
    res.status(400).json({ error: error.message }, "Entré al error de delete");
  }
};


module.exports = {
    getAllPokemons,
    getInfoDb,
    getInfoApi,
    getPokemons,
    createPokemon,
    getPokemonById,
    deletePokemon,
};