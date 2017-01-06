const fs = require('fs');

function addMapping(router,mapping){
	for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControlers(router) {
	var files=fs.readdirSync(__dirname);
	var jsFiles=files.filter((f)=>{
		return f.endsWith('.js')&&f!='index.js';
	});

	for (var f of jsFiles) {
		var c=__dirname+'/'+f;
		var mapping=require(c);
		addMapping(router,mapping);
	}
}
module.exports=function(dir){
	var router=require('koa-router')();
	addControlers(router);
	return router.routes();
}