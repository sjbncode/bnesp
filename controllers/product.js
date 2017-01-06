var getProduct=async (ctx,next)=>{
	var name = ctx.params.id;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
}

module.exports={
	'GET /p/:id':getProduct
}