'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Orders = require('../models/Orders');

var _Orders2 = _interopRequireDefault(_Orders);

var _mongodb = require('mongodb');

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _calcPriceSingle = require('../utils/calcPriceSingle');

var _calcPriceSingle2 = _interopRequireDefault(_calcPriceSingle);

var _calcPriceTotal = require('../utils/calcPriceTotal');

var _calcPriceTotal2 = _interopRequireDefault(_calcPriceTotal);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
  res.json({ message: 'works!' });
});

router.post('/', function (req, res) {
  _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var _req$body, email, products, firstName, lastName, order, hbs, templateData, emailTemplate, transporter, mailOptions;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, products = _req$body.products, firstName = _req$body.firstName, lastName = _req$body.lastName;
            order = new _Orders2.default({
              _id: new _mongodb.ObjectId(),
              email: email,
              products: products
            });
            hbs = _expressHandlebars2.default.create();
            templateData = {
              products: [],
              totalPrice: 0,
              firstName: firstName,
              lastName: lastName
            };
            emailTemplate = void 0;


            templateData.products = order.products.map(function (item) {
              return { title: item.title, amount: item.amount, price: '\u20AC ' + (0, _calcPriceSingle2.default)(item.price, item.amount, item.bonus).toFixed(2), bonus: item.bonus ? item.bonus.label : false };
            });

            templateData.totalPrice = '\u20AC ' + (0, _calcPriceTotal2.default)(order.products).toFixed(2);

            _context.next = 9;
            return hbs.render('src/views/layouts/email-order.hbs', templateData);

          case 9:
            emailTemplate = _context.sent;
            transporter = _nodemailer2.default.createTransport({
              host: 'smtp.gmail.com',
              port: 465,
              secure: true,
              auth: {
                user: 'adyaxreacttest@gmail.com',
                pass: 'adyaxReactTest@'
              }
            });
            mailOptions = {
              from: '<b.v.moskalenko@gmail.com>',
              to: email,
              subject: 'Your order \u2116 ' + order._id,
              html: emailTemplate
            };


            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                res.status(400).json({ result: "Your order is not accepted", message: "Try again!" });
              } else {
                order.save().then(function () {
                  return res.json({ result: "Your order is accepted.", message: "Check is sent to your Email!" });
                }).catch(function (err) {
                  return res.status(400).json({ result: "Your order is not accepted", message: "Try again!" });
                });
              }
            });

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }))();
});

exports.default = router;
//# sourceMappingURL=orders.js.map