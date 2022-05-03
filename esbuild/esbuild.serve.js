const esbuild = require('esbuild');
const config = require('./esbuild.config.js');

function serveSuccessMessage(serveResult){
  const message = `Compiled successfully!

  You can now view this project in the browser.
  
\tLocal:\thttp://${serveResult.host}:${serveResult.port}

The esBuild server will re-build on each group of requests,
ensuring that the served files are always up to date.
See https://esbuild.github.io/api/#serve for more.
  `;

  console.log(message);
}

esbuild.serve({
  servedir: 'build',
},{
  ...config,
  
  sourcemap: true,
}).then(serveSuccessMessage);
