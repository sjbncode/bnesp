require('dotenv').load();
const Koa=require('koa');
const app=new Koa();
const bodyParser = require('koa-bodyparser');

const isProduction = process.env.NODE_ENV === 'production';

require('./da/mongo_db');
require('./middleware/passport');

app.use(require('./middleware/perf-counter'));
app.use(require('./middleware/static-files')('/',__dirname+'/static'));
app.use(require('./middleware/static-files')('/dist/',__dirname+'/dist'));
app.use(bodyParser());
app.use(require('./middleware/render')('views',{noCache: !isProduction,watch: !isProduction}));
app.use(require('./middleware/rest').restify());
//add router middleware
app.use(require('./controllers')());

app.on('error', (err)=>{
  log.error('server error:', err);
});
app.listen(3000);
console.log('app started at port 3000');