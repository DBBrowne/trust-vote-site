const esbuild = require('esbuild');
const config = require('./esbuild.config.js');

const watch = {
  onRebuild(error, result) {
    const timestamp = (new Date).toLocaleTimeString();

    if (error || result.warning) {
      // esbuild handles build failure messages well enough.
      // a full stack trace can be displayed by uncommenting:
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
  ...config,

  minify: true,
  sourcemap: true,

  incremental: true,
  watch,
}).then(function (){
  console.log('Build succeeded.\nWatching...');
}).catch(function(){
  process.exit(1);
});
