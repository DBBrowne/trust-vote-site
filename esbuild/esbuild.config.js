const stdlibBrowserPlugin = require('node-stdlib-browser/helpers/esbuild/plugin');
const stdLibBrowser = require('node-stdlib-browser');
const svgrPlugin = require('esbuild-plugin-svgr');
const staticFiles = require('./lib/staticFiles');

const dotenv = require('dotenv');
dotenv.config();

const define = {};
for (const key in process.env) {
  define[`process.env.${key}`] = JSON.stringify(process.env[key]);
}

const inject = [
  require.resolve(
    'node-stdlib-browser/helpers/esbuild/shim'
  ),
];
const plugins = [
  svgrPlugin(),
  stdlibBrowserPlugin(stdLibBrowser),
];


staticFiles();

module.exports = {
  bundle: true,
  define,
  entryPoints: ['src/index.js'],
  inject,
  loader: { '.js': 'jsx' },
  outdir: 'build/static',
  plugins,
};
