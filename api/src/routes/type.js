const { Router } = require('express');
const { getTypes } = require('../controller/typeC');

const router = Router();

router.get('/type', getTypes);


module.exports = router;