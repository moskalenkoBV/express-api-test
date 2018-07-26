'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Users = require('../models/Users');

var _Users2 = _interopRequireDefault(_Users);

var _parseErrors = require('../utils/parseErrors');

var _parseErrors2 = _interopRequireDefault(_parseErrors);

var _mongodb = require('mongodb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

router.post('/', function (req, res) {
  var data = req.body;
  var user = new _Users2.default({
    _id: new _mongodb.ObjectId(),
    email: data.email,
    address: data.address,
    firstName: data.firstName,
    lastName: data.lastName,
    country: data.country,
    nationality: data.nationality,
    countryAdditional: '',
    addressAdditional: ''
  });
  user.setPassword(data.password);

  if (data.addressAdditional) {
    user.countryAdditional = data.countryAdditional;
    user.addressAdditional = data.addressAdditional;
  }
  user.save().then(function (userRecord) {
    return res.json({ user: userRecord.toAuthJSON() });
  }).catch(function (err) {
    return res.status(400).json({ error: (0, _parseErrors2.default)(err.errors) });
  });
});

router.post('/update', function (req, res) {
  _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var _req$body, userData, token, user, userHandler, userDataNew;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, userData = _req$body.userData, token = _req$body.token;
            user = new _Users2.default();
            userHandler = user.decodeJWT(token);
            userDataNew = {
              firstName: userData.firstName,
              lastName: userData.lastName,
              address: userData.address,
              nationality: userData.nationality,
              password: user.setPassword(userData.password),
              country: userData.country,
              email: userData.email,
              addressAdditional: userData.addressAdditional,
              countryAdditional: userData.countryAdditional
            };


            _Users2.default.findOneAndUpdate({ _id: userHandler._id }, userDataNew, { new: true }).then(function (userRecord) {
              if (userRecord) {
                res.json({ userData: {
                    firstName: userRecord.firstName,
                    lastName: userRecord.lastName,
                    address: userRecord.address,
                    email: userRecord.email,
                    emailConfirm: userRecord.email,
                    country: userRecord.country,
                    nationality: userRecord.nationality,
                    addressAdditional: userRecord.addressAdditional,
                    countryAdditional: userRecord.countryAdditional
                  } });
              } else {
                res.status(400).json({ error: "User does not exist" });
              }
            });

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }))();
});

router.post('/login', function (req, res) {
  var data = req.body;
  _Users2.default.findOne({ email: data.email }).then(function (user) {
    if (user) {
      if (user.isValidPassword(data.password)) {
        res.json({ user: user.toAuthJSON() });
      } else {
        res.status(400).json({ error: "Incorrect password" });
      }
    } else {
      res.status(400).json({ error: "User does not exist" });
    }
  });
});

router.post('/userdata', function (req, res) {
  var data = req.body;
  var user = new _Users2.default();
  var userHandler = void 0;

  try {
    userHandler = user.decodeJWT(data.token);
    _Users2.default.findOne({ _id: userHandler._id }).then(function (user) {
      if (user) {
        var userData = {
          email: user.email,
          emailConfirm: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          country: user.country,
          nationality: user.nationality,
          addressAdditional: '',
          countryAdditional: ''
        };
        if (user.addressAdditional) {
          userData.addressAdditional = user.addressAdditional, userData.countryAdditional = user.countryAdditional;
        }
        res.json(userData);
      } else {
        res.status(400).json({ token: "Incorrect token" });
      }
    });
  } catch (e) {
    res.status(400).json({ token: "Incorrect token" });
  }
});

router.get('/', function (req, res) {
  _Users2.default.find().then(function (users) {
    res.json(users);
  });
});

exports.default = router;
//# sourceMappingURL=users.js.map