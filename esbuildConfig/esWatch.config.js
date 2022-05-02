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

const watch = {
  onRebuild(error, result) {
    const timestamp = (new Date).toLocaleTimeString();

    if (error || result.warning) {
      // esbuild handles build failure messages well enough.
      // a full stack report can be displayed by uncommenting:
      // console.error('watch build failed:', error)
      console.log(`[${timestamp}] Watch build failed.`);
      return;
    }

    console.clear();
    console.log('Watching...');
    console.log(`[${timestamp}] Watch build succeeded.`);
  },
};

console.clear();
esbuild.build({
  bundle: true,
  define,
  entryPoints: ['./src/index.js'],
  inject,
  loader: { '.js': 'jsx' },
  minify: true,
  outdir: 'build/static',
  plugins,
  sourcemap: true,

  incremental: true,
  watch,
}).then(function (){
  console.log('Watching...');
}).catch(function(){
  process.exit(1);
});
