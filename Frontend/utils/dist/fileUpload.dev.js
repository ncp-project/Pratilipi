"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _universalCookie = _interopRequireDefault(require("universal-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cookies = new _universalCookie["default"](); // const API_URL = 'http://localhost:8000/';

var API_URL = 'https://pratilipi-ncp.herokuapp.com';

var _default = function _default(_ref) {
  var data = _ref.data;
  var token = cookies.get('token');
  return (0, _axios["default"])({
    method: 'post',
    url: API_URL,
    data: data,
    headers: {
      Authorization: token ? "JWT ".concat(token) : null
    },
    config: {
      headers: {
        'Content-Tranfer-Encoding': 'multipart/form-data',
        'Content-Type': 'application/graphql'
      }
    }
  }).then(function (response) {
    return response.data;
  })["catch"](function (response) {
    throw response;
  });
};

exports["default"] = _default;