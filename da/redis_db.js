var redis = require('redis');
var redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_SERVER);

redisClient.on('error', function(err) {
	console.log('Error ' + err);
});

redisClient.on('connect', function() {
	console.log('Redis is ready');
});
var get = function(key) {
	return new Promise(resolve => {
		redisClient.get(key, (err, reply) => resolve({
			error: err,
			reply: reply
		}));
	});
}
var set = function(key, value) {
	redisClient.set(key, value);
}

var expire = function(key, sec) {
	redisClient.expire(key, sec);
}

exports.get = get;
exports.set = set;
exports.expire = expire;