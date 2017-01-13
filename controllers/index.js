const fs = require('fs');
const path = require('path');

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

function addControlers(router,dir) {
	var files=fs.readdirSync(dir);
	files.filter((f)=>{
		return f.endsWith('.js')&&f!='index.js';
	}).forEach((f)=>{
		var c=dir+'/'+f;
		var mapping=require(c);
		addMapping(router,mapping);
	});

	files.filter((f)=>{
		return !fs.statSync(path.join(dir,f)).isFile();
	})
	.forEach((f)=>{
		addControlers(router,path.join(dir,f));
	});
}
module.exports=function(dir){
	var router=require('koa-router')();
	addControlers(router,__dirname);
	return router.routes();
}