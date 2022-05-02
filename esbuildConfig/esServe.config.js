const esbuild = require('esbuild');
const svgrPlugin = require('esbuild-plugin-svgr');
const plugin = require('node-stdlib-browser/helpers/esbuild/plugin');
const stdLibBrowser = require('node-stdlib-browser');

const dotenv = require('dotenv');
dotenv.config();

const define = {
  // 'process.env.NODE_ENV': '"development"',
};
for (const key in process.env) {
  define[`process.env.${key}`] = JSON.stringify(process.env[key]);
}

const inject = [
  // 'esbuildConfig/esBuild_reactShim.js',
  require.resolve(
    'node-stdlib-browser/helpers/esbuild/shim'
  ),
];
const plugins = [
  svgrPlugin(),
  plugin(stdLibBrowser),
];

esbuild.serve({
  servedir: 'build',
},{
  bundle: true,
  define,
  entryPoints: ['src/index.js'],
  inject,
  loader: { '.js': 'jsx' },
  plugins,
  outdir: 'build/static',
  sourcemap: true,
}).then(function (result) {
  console.log(result);
});