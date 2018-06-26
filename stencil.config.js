// exports.config = {
//   globalStyle: 'src/global/app.css',
//   outputTargets: [
// 	  {
// 		  type: 'www',
// 		  serviceWorker: {
// 			  swSrc: 'src/sw.js'
// 		  }
// 	  }
//   ]
// };

// exports.devServer = {
//   root: 'www',
//   watchGlob: '**/**'
// };
exports.config = {
	globalStyle: 'src/global/app.css',
	outputTargets: [
		{
			type: 'www'
		}
	]
  };
  
  exports.devServer = {
	root: 'www',
	watchGlob: '**/**'
  };  