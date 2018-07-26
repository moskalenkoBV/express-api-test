"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var calcPriceSingle = function calcPriceSingle(price, amount, bonus) {
  return bonus === null ? price * amount : (price + price * bonus.value) * amount;
};

exports.default = calcPriceSingle;
//# sourceMappingURL=calcPriceSingle.js.map