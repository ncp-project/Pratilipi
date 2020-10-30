"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

var _universalCookie = _interopRequireDefault(require("universal-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cookies = new _universalCookie["default"](); // const API_URL = 'http://localhost:8000/';

var API_URL = 'https://pratilipi-ncp.herokuapp.com';

var _default = function _default(_ref) {
  var query = _ref.query,
      variables = _ref.variables,
      token = _ref.token;
  var body = {
    query: query,
    variables: variables
  };

  if (!token) {
    token = cookies.get('token');
  }

  var apiConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? "JWT ".concat(token) : null
    },
    body: JSON.stringify(body)
  };
  return (0, _isomorphicFetch["default"])(API_URL, apiConfig).then(function (response) {
    var contentType = response.headers.get('content-type');

    if (response.ok) {
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json().then(function (json) {
          return json;
        });
      }

      if (contentType && contentType.indexOf('text') !== -1) {
        return response.text().then(function (text) {
          return text;
        });
      }

      return response;
    }

    console.error("Response status ".concat(response.status, " during dataFetch for url ").concat(response.url, "."));
    throw response;
  });
};

exports["default"] = _default;