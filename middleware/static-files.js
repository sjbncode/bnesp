const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

// url: 类似 '/static/'
// dir: 类似 __dirname + '/static'
function staticFiles(url, dir) {
    return async(ctx, next) => {
        var rpath = ctx.request.path;
        var subdir = rpath.substring(url.length);
        if (rpath.startsWith(url) && subdir != '') {
            var fp = path.join(dir, subdir);
            if (await fs.exists(fp)) {
                // 查找文件的mime:
                ctx.response.type = mime.lookup(rpath);
                ctx.response.body = await fs.readFile(fp);
            } 
            else {
                await next();
            }
        } else {
            await next();
        }
    };
}
module.exports = staticFiles;