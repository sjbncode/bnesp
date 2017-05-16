require('dotenv').load();
const Koa=require('koa');
const app=new Koa();
const bodyParser = require('koa-bodyparser');

const isProduction = process.env.NODE_ENV === 'production';

require('./da/mongo_db');
require('./middleware/passport');

app.use(require('./middleware/perf-counter'));
app.use(require('./middleware/static-files')('/dist/',__dirname+'/dist'));
app.use(require('./middleware/static-files')('/uploads/',__dirname+'/uploads'));
app.use(bodyParser({
  extendTypes: {
    json: ['application/x-javascript','application/json'] // will parse application/x-javascript type body as a JSON string
  }
}));
app.use(async (ctx,next)=>{
	await next();
})
app.use(require('./middleware/rest').restify());
//add router middleware
app.use(require('./controllers')());

app.on('error', (err)=>{
  log.error('server error:', err);
});
var port=process.env.PORT||3000;
app.listen(port);
console.log(`app started at port ${port}`);