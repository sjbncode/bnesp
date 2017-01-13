// require('./user');
// require('./project');

const fs = require('fs');
function addModels() {
	var files=fs.readdirSync(__dirname);
	var jsFiles=files.filter((f)=>{
		return f.endsWith('.js')&&f!='index.js';
	});
	for (var f of jsFiles) {
		var c='./'+f;
		console.log('Loading model:'+f);
		require(c);
	}
}
module.exports=addModels;