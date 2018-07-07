const sass = require('@stencil/sass');

exports.config = {
   globalStyle: 'src/global/app.css',
   outputTargets: [
      {
         type: 'www',
         serviceWorker: {
            swSrc: 'src/sw.js',
            globPatterns: [
               '**/*.{js,css,json,html,ico,png}'
            ]
         }
      }
   ],
   plugins: [
      sass()
   ]
};

exports.devServer = {
   root: 'www',
   watchGlob: '**/**'
};

// exports.config = {
// 	globalStyle: 'src/global/app.css',
// 	outputTargets: [
// 		{
// 			type: 'www'
// 		}
// 	]
//   };

//   exports.devServer = {
// 	root: 'www',
// 	watchGlob: '**/**'
//   };  