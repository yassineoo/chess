"use strict";

express = require('express');
route = express.Router();

var _require = require('../controllers/sign'),
    getsign = _require.getsign,
    signin = _require.signin,
    verify = _require.verify;

route.get('/', getsign);
route.post('/', signin);
route.get('/:token', verify);
module.exports = route;