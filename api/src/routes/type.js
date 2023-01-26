const { Router } = require('express');
const { getTypes, createType } = require('../controller/typeC');

const router = Router();

router.get('/type', getTypes);
// router.post('/type', createType)


module.exports = router;