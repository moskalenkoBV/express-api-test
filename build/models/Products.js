'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = new _mongoose2.default.Schema({
  title: String,
  description: String,
  price: String,
  min: Number,
  max: Number
}, { timestamps: true });

exports.default = _mongoose2.default.model('Products', schema);
//# sourceMappingURL=Products.js.map