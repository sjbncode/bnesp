var passport = require('passport');
var tokenManager = require('../middleware/token_manager');
var auth = tokenManager.verifyToken;
var renew = tokenManager.renewToken;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var index = async(ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/api/signin" method="post">
            <p>Name: <input name="username" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};
var register_view = async(ctx, next) => {
    ctx.response.body = `<h1>register</h1>
        <form action="/api/register" method="post">
            <p>Name: <input name="username" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};
var register = async(ctx, next) => {
    var req = ctx.request;
    if (!req.body.username || !req.body.password) {
        throw new ctx.apiError(400, 'All fields required');
        return;
    }
    var user = new User();
    user.username = req.body.username;
    user.setPassword(req.body.password);
    var u = await user.save();
    var token = u.generateJwt();
    ctx.rest({
        token: token
    });
};

var authenticate = function(request) {
    return new Promise(resolve => {
        passport.authenticate('local', (err, user, info) => resolve({
            err: err,
            user: user,
            info: info
        }))(request);
    });
}
var signin = async(ctx, next) => {
    var r = await authenticate(ctx.request);
    console.log(r);
    if (r.err) {
        throw new ctx.apiError(404, r.err);
    }
    if (r.user) {
        var token = r.user.generateJwt();
        ctx.rest({
            "token": token
        });
    } else {
        throw new ctx.apiError(401, r.info.message);
    }
};

module.exports = {
    'GET /': [index],
    'GET /register': register_view,
    'POST /api/register': register,
    'POST /api/signin': [signin],
    'POST /renew': [auth, renew]
};