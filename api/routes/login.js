express = require('express');
route = express.Router();
const {getlog,login} =
  require('../controllers/log');
route.get('/',getlog);
route.post('/',login);
module.exports = route; 