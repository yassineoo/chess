express = require('express');
route = express.Router();
const {getsign,signin,verify} =
  require('../controllers/sign');
route.get('/',getsign);
route.post('/',signin);
route.get('/:token', verify);
module.exports = route; 