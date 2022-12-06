const { Router } = require('express');
const PokemonRoutes = require('./pokemon')
const TypeRoutes = require('./type')

const router = Router();

router.use('/', PokemonRoutes);
router.use('/', TypeRoutes);



module.exports = router;
