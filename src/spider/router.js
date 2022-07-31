const express = require('express');
const router = express.Router();
const api = require('./api');
module.exports = router;

router.get('/confirmShop', (req, res, next) => {
  api.confirmShop(req, res, next);
});
