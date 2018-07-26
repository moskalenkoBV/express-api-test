'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _calcPriceSingle = require('./calcPriceSingle');

var _calcPriceSingle2 = _interopRequireDefault(_calcPriceSingle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calcPriceTotal = function calcPriceTotal(products) {
  var totalPrice = 0;
  products.forEach(function (item) {
    totalPrice += (0, _calcPriceSingle2.default)(item.price, item.amount, item.bonus);
  });
  return totalPrice;
};

exports.default = calcPriceTotal;
//# sourceMappingURL=calcPriceTotal.js.map