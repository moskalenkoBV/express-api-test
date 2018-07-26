'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = new _mongoose2.default.Schema({
  email: { type: String, unique: true },
  passwordHash: String,
  firstName: String,
  lastName: String,
  address: String,
  country: {
    label: String,
    value: String
  },
  nationality: {
    label: String,
    value: String
  },
  addressAdditional: String,
  countryAdditional: {
    label: String,
    value: String
  }
}, { timestamps: true });

schema.methods.setPassword = function setPassword(password) {
  this.passwordHash = _bcrypt2.default.hashSync(password, 10);
};

schema.methods.isValidPassword = function isValidPassword(password) {
  return _bcrypt2.default.compareSync(password, this.passwordHash);
};

schema.methods.generateJWT = function generateJWT() {
  return _jsonwebtoken2.default.sign({
    _id: this._id
  }, process.env.JWT_SECRET);
};

schema.methods.decodeJWT = function decodeJWT(token) {
  return _jsonwebtoken2.default.verify(token, process.env.JWT_SECRET);
};

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    token: this.generateJWT()
  };
};

schema.plugin(_mongooseUniqueValidator2.default, { message: 'This email is already taken' });

exports.default = _mongoose2.default.model('Users', schema);
//# sourceMappingURL=Users.js.map