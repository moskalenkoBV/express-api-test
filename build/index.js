'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _products = require('./routes/products');

var _products2 = _interopRequireDefault(_products);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _orders = require('./routes/orders');

var _orders2 = _interopRequireDefault(_orders);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

_dotenv2.default.config();

_mongoose2.default.Promise = _bluebird2.default;

_mongoose2.default.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, function (error) {
  // if(error) {
  //   process.exit(1);
  // }
});

app.engine('handlebars', (0, _expressHandlebars2.default)({ extname: '.hbs' }));

app.set('view engine', '.hbs');

app.use(_bodyParser2.default.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/orders', _orders2.default);

app.use('/api/products', _products2.default);

app.use('/api/users', _users2.default);

app.get('/*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 4000, function () {
  console.log('Listening...');
});

exports.default = app;
//# sourceMappingURL=index.js.map