
const Koa=require('koa');
const app=new Koa();
const bodyParser = require('koa-bodyparser');

const isProduction = process.env.NODE_ENV === 'production';

app.use(require('./middleware/perf-counter'));
app.use(require('./middleware/static-files')('/',__dirname+'/static'));
app.use(bodyParser());
app.use(require('./middleware/render')('views',{noCache: !isProduction,watch: !isProduction}));
app.use(require('./middleware/rest').restify());
//add router middleware
app.use(require('./controllers')());

app.listen(3000);
console.log('app started at port 3000');