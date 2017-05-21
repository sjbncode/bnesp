var mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
	name: String,
	descriptions: [String],
	imgs: [{
		name: String,
		path: String
	}],
	prices: [{
		moq: String,
		amount: Number
	}],
	pid: {
		type: String,
		index: true,
		unique: true
	},
	category: [String],
	colors:[String],
	updatedtime: {
		type: Date,
		default: Date.now
	},
	created: {
		type: Date,
		default: Date.now
	}
});
// userSchema.methods.setPassword = function(password){
//   this.salt = crypto.randomBytes(16).toString('hex');
//   this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
// };
// productSchema.virtual('pid').get(function () {
//   return this._id;
// });
productSchema.pre('save', function(next) {

	next();
});

productSchema.methods.setSN = async function() {


	if (this.pid == undefined || this.pid == '') {
		var c = new Date();
		var y = String.fromCharCode(65 + parseInt(c.getFullYear().toString().substr(2)) - 10);
		var m = String.fromCharCode(65 + (c.getMonth() + 1) + 6);
		var tmp = "00" + c.getMilliseconds().toString();
		var r = tmp.substr(tmp.length - 2);


		var sn = await getNext(y + m, 1);
		var tmp2 = "000" + sn;
		this.pid = y + m + tmp2.substr(tmp2.length - 3) + r;
	}
	return this.pid
}

var getNext = async function(prefix, c) {
	var SN = mongoose.model('SerialNumber');
	var sn = await SN.findOne({
		type: 'product',
		prefix: prefix
	})

	if (!sn) {
		new SN({
			type: 'product',
			prefix: prefix,
			currentNumber: c
		}).save();
		return 0;
	} else {
		var cn = sn.currentNumber;
		sn.currentNumber += c;
		new SN(sn).save();
		return cn;
	}
	return sn;
}


var serialNumberSchema = new mongoose.Schema({
	type: String,
	prefix: String,
	currentNumber: Number
})
mongoose.model('SerialNumber', serialNumberSchema);
mongoose.model('Product', productSchema);