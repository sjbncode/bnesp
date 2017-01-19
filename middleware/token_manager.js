var redisClient = require('../da/redis_db');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION;
var TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION * 60;

// Middleware for token verification
var getToken = function(headers) {
	if (headers && headers.authorization && headers.authorization.split(' ').length == 2) {
		return headers.authorization.split(' ')[1];
	}
	return null;
};
module.exports.verifyToken = async(ctx, next)=> {
	var token = getToken(ctx.request.headers);
	var v = await redisClient.get(token);
	console.log(v);
	if (v.err) {
		console.log(v.err);
		return ctx.response.send(500);
	}
	if (v.reply) {
		ctx.response.send(401);
	} else {
		next();
	}
};

module.exports.expireToken = function(headers) {
	var token = getToken(headers);

	if (token != null) {
		redisClient.set(token, {
			is_expired: true
		});
		redisClient.expire(token, TOKEN_EXPIRATION_SEC);
	}
};

module.exports.renewToken=async (ctx,next)=>{
	User.findById(ctx.request.user._id, function(err, user) {
    if (err) {
      throw new ctx.apiError(401,'unauthenticated');
    } else {
      var token = user.generateJwt();
      ctx.rest({token:token});
    }
  });
};