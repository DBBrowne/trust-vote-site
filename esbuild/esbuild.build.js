const esbuild = require('esbuild');
const config = require('./esbuild.config.js');

esbuild.build({
  ...config,
  
  bundle: true,
  minify: true,
}).then(function () {
  console.log('Build Succeeded');
}).catch(function () {
  process.exit(1);
});
