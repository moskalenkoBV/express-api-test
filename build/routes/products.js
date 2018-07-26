'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Products = require('../models/Products');

var _Products2 = _interopRequireDefault(_Products);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
  _Products2.default.find().then(function (products) {
    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(400).json({ errors: { products: "No Products" } });
    }
  });
});

exports.default = router;
//# sourceMappingURL=products.js.map