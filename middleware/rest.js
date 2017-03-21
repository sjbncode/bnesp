module.exports = {
    restify: (pathPrefix) => {
        pathPrefix = pathPrefix || '/api/';
        return async(ctx, next) => {
            ctx.apiError = function(code, message) {
                this.code = code || 'internal:unknown_error';
                this.message = message || '';
            }
            ctx.rest = (data) => {
                if (data.error) {
                    throw new ctx.apiError(500, data.error);
                }
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.response.body = data;
            }
            if (ctx.request.path.startsWith(pathPrefix)) {
                try {
                    ctx.response.set('Access-Control-Allow-Origin', '*');
                    ctx.response.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
                    if ('OPTIONS' == ctx.request.method)
                        return ctx.response.status = 200;
                    await next();
                } catch (e) {
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code: e.code || 'internal:unknown_error',
                        message: e.message || ''
                    };
                }
            } else {
                await next();
            }
        };
    }
};