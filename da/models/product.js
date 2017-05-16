var mongoose = require( 'mongoose' );
var productSchema=new mongoose.Schema({
  // userId
  pid:mongoose.Schema.Types.ObjectId,
  name:String,
  descriptions:[String],
  imgs:[{name:String,url:String}],
  prices:[{moq:String,amount:Number}],
  sn:String,
  // status:String,
  updatedtime: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now }
});
// userSchema.methods.setPassword = function(password){
//   this.salt = crypto.randomBytes(16).toString('hex');
//   this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
// };
productSchema.methods.setSN=function(){
	this.sn=''
}
mongoose.model('Product', productSchema);

