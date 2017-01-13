var performance=async (ctx,next)=>{
    var start = new Date().getTime(),execTime;
    await next();
    execTime = new Date().getTime() - start;
    console.log(`Process ${ctx.request.method} ${ctx.request.url} ${execTime}ms ${ctx.response.status}`);
    ctx.response.set('X-Response-Time', `${execTime}ms`);
}
module.exports=performance;