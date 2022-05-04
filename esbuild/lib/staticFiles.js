const fs = require('fs');
const path = require('path');

function clearDir(directory) {
  return new Promise(function (resolve, reject){
    fs.readdir(directory, function (err, files) {
      if (err) reject(err);
  
      for (const file of files) {
        fs.unlink(path.join(directory, file), function () {
          resolve();
        });
      }
    });
  });
}

function copyPublicToBuild(){
  return new Promise(function (resolve, reject){
    fs.cp(
      './public/',
      './build/',
      { recursive: true , force: true, verbatimSymlinks: false },
      function (err, data){
        if (err) reject(err);
        resolve(data);
      }
    );
  });
}


function injectBuiltFiles(
  outdir, 
  pathToHtml = './build/index.html'
){
  return new Promise(function (resolve, reject){
    const outFiles = fs.readdirSync(
      outdir
    ).filter(function (fileName){
      return !fileName.endsWith('.map');
    });
  
    fs.readFile(pathToHtml, 'utf-8', function(err, html){
      if (err) reject(err);

      html = html.replaceAll('%PUBLIC_URL%', '.');
  
      outFiles.forEach(function (fileName) {
        if (fileName.endsWith('js')){
          html = html.replace('</body>', `\t<script src="./static/${fileName}"></script>\n\t</body>`);
        }
        if (fileName.endsWith('css')){
          html = html.replace('</head>',`\t<link href="./static/${fileName}" rel="stylesheet">\n\t</head>`);
        }
      });
      fs.writeFile(pathToHtml, html,'utf-8', function(err) {
        if (err) reject(err);
        resolve();
      });
    });
  });
}

module.exports = async function(){
  await clearDir('./build');
  await copyPublicToBuild();
  return injectBuiltFiles('./build/static');
};
