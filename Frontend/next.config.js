const withPlugins = require('next-compose-plugins');
const sass = require('@zeit/next-sass');
const css = require('@zeit/next-css');
const withSourceMaps = require('@zeit/next-source-maps')

module.exports = withPlugins([
  [withSourceMaps],
  [css],
  [sass],
]);
