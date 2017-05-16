var mongoose = require('mongoose');
var Product = mongoose.model('Product');

var bs={};
bs.getProductByCategroy=async(ctx, next) => {
	var category=ctx.params.category;
	console.log(category);
	var dummy = [{"id":0,"pic":"//cdna.4imprint.com/prod/150/451624.jpg","name":"Gildan 6 oz. Ultra Cotton T-Shirt - Youth - White - Embroidered","price":"Prices from $4.50 to $10.75"},{"id":1,"pic":"//cdna.4imprint.com/prod/150/365463.jpg","name":"Gildan 6 oz. Ultra Cotton LS T-Shirt - Men's - White - Screen","price":"Prices from $5.75 to $11.75"},{"id":2,"pic":"//cdna.4imprint.com/prod/150/404972.jpg","name":"Gildan 5.3 oz. Cotton T-Shirt - Ladies' - Embroidered - Colors","price":"Prices from $4.75 to $10.25"},{"id":3,"pic":"//cdna.4imprint.com/prod/150/440159.jpg","name":"Anvil Ringspun 5.4 oz. T-Shirt - Ladies' - White","price":"Prices from $3.35 to $8.29"},{"id":4,"pic":"//cdna.4imprint.com/prod/150/370137.jpg","name":"Jerzees Blend 50/50 T-Shirt - Youth - White","price":"Prices from $2.99 to $6.75"},{"id":5,"pic":"//cdna.4imprint.com/prod/150/369913.jpg","name":"Champion Tagless T-Shirt - Embroidered - White","price":"Prices from $5.65 to $11.39"},{"id":6,"pic":"//cdna.4imprint.com/prod/150/328716.jpg","name":"Hanes ComfortSoft Tee - Men's - Screen - Colors","price":"Prices from $4.74 to $9.70"},{"id":7,"pic":"//cdna.4imprint.com/prod/150/422280.jpg","name":"All-American Long Sleeve Tee - Colors","price":"Prices from $8.50 to $16.85"},{"id":8,"pic":"//cdna.4imprint.com/prod/150/420523.jpg","name":"Gildan 5.3 oz. Cotton LS T-Shirt - Ladies' - Screen - Colors","price":"Prices from $6.24 to $11.75"},{"id":9,"pic":"//cdna.4imprint.com/prod/150/368599.jpg","name":"Jerzees Cotton T-Shirt - White - Screen","price":"Prices from $2.49 to $6.25"},{"id":10,"pic":"//cdna.4imprint.com/prod/150/448044.jpg","name":"Gildan SoftStyle T-Shirt - Men's - FC - White","price":"Prices from $5.99 to $11.75"},{"id":11,"pic":"//cdna.4imprint.com/prod/150/391672.jpg","name":"Bayside Union Made Pocket T-Shirt - Colors","price":"Prices from $8.95 to $16.75"},{"id":12,"pic":"//cdna.4imprint.com/prod/150/368557.jpg","name":"Gildan 5.6 oz. DryBlend 50/50 T-Shirt - Screen - White","price":"Prices from $2.69 to $7.99"},{"id":13,"pic":"//cdna.4imprint.com/prod/150/368394.jpg","name":"Hanes 50/50 ComfortBlend T-Shirt - Youth - White - Screen","price":"Prices from $2.75 to $8.25"},{"id":14,"pic":"//cdna.4imprint.com/prod/150/440166.jpg","name":"Anvil Ringspun 5.4 oz. T-Shirt - Men's - Colors","price":"Prices from $4.09 to $9.55"},{"id":15,"pic":"//cdna.4imprint.com/prod/150/404967.jpg","name":"Gildan 5.3 oz. Cotton T-Shirt - Ladies' - Embroidered - White","price":"Prices from $4.29 to $9.55"},{"id":16,"pic":"//cdna.4imprint.com/prod/150/447980.jpg","name":"5.2 oz. Cotton T-Shirt - Youth - Full Color","price":"Prices from $6.89 to $16.49"},{"id":17,"pic":"//cdna.4imprint.com/prod/150/448664.jpg","name":"Gildan 5.3 oz. Cotton T-Shirt - Ladies' - Full Color - Color","price":"Prices from $7.95 to $17.85"},{"id":18,"pic":"//cdna.4imprint.com/prod/150/374480.jpg","name":"Hanes ComfortSoft Tee - Men's - Embroidered - Colors","price":"Prices from $5.45 to $10.45"},{"id":19,"pic":"//cdna.4imprint.com/prod/150/451626.jpg","name":"Gildan 6 oz. Ultra Cotton LS T-Shirt - Men's - White - Embroidered","price":"Prices from $8.75 to $16.75"},{"id":20,"pic":"//cdna.4imprint.com/prod/150/378885.jpg","name":"Jerzees Blend 50/50 LS T-Shirt - Screen - Colors","price":"Prices from $6.99 to $13.50"},{"id":21,"pic":"//cdna.4imprint.com/prod/150/328722.jpg","name":"Hanes ComfortSoft Tee - Youth - Screen - Colors","price":"Prices from $3.75 to $9.15"},{"id":22,"pic":"//cdna.4imprint.com/prod/150/331789.jpg","name":"Hanes 50/50 ComfortBlend T-Shirt - Youth - Colors - Screen","price":"Prices from $4.25 to $10.49"},{"id":23,"pic":"//cdna.4imprint.com/prod/150/392345.jpg","name":"Tie-Dye T-Shirt - Two-Tone Spiral - Screen","price":"Prices from $7.35 to $14.25"},{"id":24,"pic":"//cdna.4imprint.com/prod/150/422444.jpg","name":"Port 50/50 Blend T-Shirt - Men's - White - Screen","price":"Prices from $2.99 to $7.99"},{"id":25,"pic":"//cdna.4imprint.com/prod/150/427267.jpg","name":"Hanes ComfortSoft V-Neck Tee - Ladies' - Screen - White","price":"Prices from $4.50 to $11.50"},{"id":26,"pic":"//cdna.4imprint.com/prod/150/376018.jpg","name":"Gildan 5.3 oz. Cotton LS T-Shirt - Embroidered - Colors","price":"Prices from $6.69 to $12.95"},{"id":27,"pic":"//cdna.4imprint.com/prod/150/406550.jpg","name":"All-American Tee - Colors","price":"Prices from $5.99 to $12.50"},{"id":28,"pic":"//cdna.4imprint.com/prod/150/440129.jpg","name":"Port Classic 5.4 oz. T-Shirt - Heathers - Emb","price":"Prices from $5.45 to $10.55"},{"id":29,"pic":"//cdna.4imprint.com/prod/150/374465.jpg","name":"Hanes ComfortSoft Tee - Men's - Embroidered - White","price":"Prices from $3.95 to $8.95"},{"id":30,"name":"All-American Tee with Pocket - White","price":"Prices from $5.99 to $12.25"},{"id":31,"name":"Adult 4.3 oz. Ringspun Cotton T-Shirt - Embroidered","price":"Prices from $4.65 to $9.95"},{"id":32,"name":"Bayside USA Made T-Shirt w/Pocket - White","price":"Prices from $6.55 to $12.95"},{"id":33,"name":"Gildan 5.6 oz. DryBlend 50/50 Pocket T-Shirt - Screen-Colors","price":"Prices from $6.50 to $13.50"},{"id":34,"name":"5.2 oz. Cotton Long Sleeve T-Shirt - Youth - Embroidered","price":"Prices from $4.65 to $11.15"},{"id":35,"pic":"//cdna.4imprint.com/prod/150/368747.jpg","name":"FOL Long Sleeve 100% Cotton T-Shirt - White - Screen","price":"Prices from $4.19 to $9.79"},{"id":36,"pic":"//cdna.4imprint.com/prod/150/368608.jpg","name":"Jerzees Blend 50/50 T-Shirt - Men's - White - Screen","price":"On sale from $2.85 to $7.69"},{"id":37,"pic":"//cdna.4imprint.com/prod/150/447990.jpg","name":"5.2 oz. Cotton Long Sleeve T-Shirt - Youth - Full Color","price":"Prices from $7.95 to $19.25"},{"id":38,"pic":"//cdna.4imprint.com/prod/150/382414.jpg","name":"Gildan 5.6 oz. DryBlend 50/50 LS T-Shirt - White","price":"Prices from $4.75 to $11.25"},{"id":39,"pic":"//cdna.4imprint.com/prod/150/392332.jpg","name":"Tie-Dye T-Shirt - Tonal Spider - Screen","price":"Prices from $7.35 to $14.25"},{"id":40,"pic":"//cdna.4imprint.com/prod/150/440133.jpg","name":"Port Classic 5.4 oz. T-Shirt – White - Emb","price":"Prices from $4.15 to $9.35"},{"id":41,"pic":"//cdna.4imprint.com/prod/150/383423.jpg","name":"Bayside USA Made T-Shirt - White - Screen","price":"Prices from $5.05 to $10.95"},{"id":42,"pic":"//cdna.4imprint.com/prod/150/422287.jpg","name":"All-American Long Sleeve Tee - White","price":"Prices from $7.29 to $14.95"},{"id":43,"pic":"//cdna.4imprint.com/prod/150/383441.jpg","name":"Bayside USA Made Long Sleeve T-Shirt - White","price":"Prices from $6.95 to $13.75"},{"id":44,"pic":"//cdna.4imprint.com/prod/150/451618.jpg","name":"Hanes 50/50 ComfortBlend T-Shirt - Youth - Colors - Emb","price":"Prices from $5.25 to $10.95"},{"id":45,"pic":"//cdna.4imprint.com/prod/150/449711.jpg","name":"FOL Long Sleeve 100% Cotton T-Shirt - Colors - Embroidered","price":"Prices from $7.25 to $14.75"},{"id":46,"pic":"//cdna.4imprint.com/prod/150/391705.jpg","name":"Bayside Union Made LS Pocket T-Shirt - Colors","price":"Prices from $12.25 to $21.25"},{"id":47,"pic":"//cdna.4imprint.com/prod/150/451619.jpg","name":"Hanes 50/50 ComfortBlend T-Shirt - Youth - White - Emb","price":"Prices from $4.25 to $9.25"},{"id":48,"pic":"//cdna.4imprint.com/prod/150/378986.jpg","name":"Hanes LS Beefy-T - Screen - White","price":"Prices from $7.25 to $13.75"},{"id":49,"pic":"//cdna.4imprint.com/prod/150/370282.jpg","name":"Gildan 5.3 oz. Cotton LS T-Shirt - Screen - White","price":"Prices from $3.99 to $9.49"}];
	ctx.rest(dummy);
};
bs.getProductById=async(ctx, next) => {
	var pid=ctx.params.pid;
	console.log(pid);
	var dummy={pid:pid,description:'this is discrition from api',
imgs:[{name:'1',url:'//cdna.4imprint.com/prod/300/459298.jpg'},
{name:'2',url:'//cdna.4imprint.com/prod/extras/128981/459298/300/1.jpg'},
{name:'3',url:'//cdna.4imprint.com/prod/extras/128981/459298/300/2.jpg'},
{name:'4',url:'//cdna.4imprint.com/prod/extras/128981/459298/300/3.jpg'}
],
descriptions:[
'Checkpoint friendly construction of the backpack makes it your ideal travel companion!',
'Features a laptop compartment that holds up to a 17" laptop.',
'Laptop compartment unzips flat to make it easier to go through airport security.',
'Zippered main compartment includes a padded compartment for your tablet and is spacious enough for a padfolio and other items such as books or folders.',
'Bottom zippered pocket includes a deluxe organizer for your pens and business cards.',
'Top zippered pocket can fit your phone cables and chargers for tangle-free storage.',
'The top pocket also features an audio exit port for listening to music on the go.',
'Zippers feature easy-to-grab toggles for quick and easy access.',
'Two side mesh pockets hold water bottles accessibly.',
'Adjustable backpack straps and carry handle make carrying the back pack easy and comfortable.',
'Backpack is made of 600D polycanvas with ripstop accents and a honeycomb print.',
'Size: 18-1/2" x 12-3/4" x 6".',
'Your price includes embroidery on the front pocket.',
'One-time tape charge: add $35 for fewer than 24 pieces; free for 24 or more!',
'Maximum number of imprint colors: 12',
'Ready to ship in : 4 business days *.'
],
prices:[{moq:1000,amount:10.882},{moq:5000,amount:9.882},{moq:10000,amount:8.882},{moq:20000,amount:6.882}]}
	ctx.rest(dummy);
}
bs.searchProduct=async(ctx, next) => {
	var filter=ctx.params.filter;
	var dummy = [{"id":0,"pic":"//cdna.4imprint.com/prod/150/451624.jpg","name":"Gildan 6 oz. Ultra Cotton T-Shirt - Youth - White - Embroidered","price":"Prices from $4.50 to $10.75"},{"id":1,"pic":"//cdna.4imprint.com/prod/150/365463.jpg","name":"Gildan 6 oz. Ultra Cotton LS T-Shirt - Men's - White - Screen","price":"Prices from $5.75 to $11.75"},{"id":2,"pic":"//cdna.4imprint.com/prod/150/404972.jpg","name":"Gildan 5.3 oz. Cotton T-Shirt - Ladies' - Embroidered - Colors","price":"Prices from $4.75 to $10.25"},{"id":3,"pic":"//cdna.4imprint.com/prod/150/440159.jpg","name":"Anvil Ringspun 5.4 oz. T-Shirt - Ladies' - White","price":"Prices from $3.35 to $8.29"},{"id":4,"pic":"//cdna.4imprint.com/prod/150/370137.jpg","name":"Jerzees Blend 50/50 T-Shirt - Youth - White","price":"Prices from $2.99 to $6.75"},{"id":5,"pic":"//cdna.4imprint.com/prod/150/369913.jpg","name":"Champion Tagless T-Shirt - Embroidered - White","price":"Prices from $5.65 to $11.39"},{"id":6,"pic":"//cdna.4imprint.com/prod/150/328716.jpg","name":"Hanes ComfortSoft Tee - Men's - Screen - Colors","price":"Prices from $4.74 to $9.70"},{"id":7,"pic":"//cdna.4imprint.com/prod/150/422280.jpg","name":"All-American Long Sleeve Tee - Colors","price":"Prices from $8.50 to $16.85"},{"id":8,"pic":"//cdna.4imprint.com/prod/150/420523.jpg","name":"Gildan 5.3 oz. Cotton LS T-Shirt - Ladies' - Screen - Colors","price":"Prices from $6.24 to $11.75"},{"id":9,"pic":"//cdna.4imprint.com/prod/150/368599.jpg","name":"Jerzees Cotton T-Shirt - White - Screen","price":"Prices from $2.49 to $6.25"},{"id":10,"pic":"//cdna.4imprint.com/prod/150/448044.jpg","name":"Gildan SoftStyle T-Shirt - Men's - FC - White","price":"Prices from $5.99 to $11.75"},{"id":11,"pic":"//cdna.4imprint.com/prod/150/391672.jpg","name":"Bayside Union Made Pocket T-Shirt - Colors","price":"Prices from $8.95 to $16.75"},{"id":12,"pic":"//cdna.4imprint.com/prod/150/368557.jpg","name":"Gildan 5.6 oz. DryBlend 50/50 T-Shirt - Screen - White","price":"Prices from $2.69 to $7.99"},{"id":13,"pic":"//cdna.4imprint.com/prod/150/368394.jpg","name":"Hanes 50/50 ComfortBlend T-Shirt - Youth - White - Screen","price":"Prices from $2.75 to $8.25"},{"id":14,"pic":"//cdna.4imprint.com/prod/150/440166.jpg","name":"Anvil Ringspun 5.4 oz. T-Shirt - Men's - Colors","price":"Prices from $4.09 to $9.55"},{"id":15,"pic":"//cdna.4imprint.com/prod/150/404967.jpg","name":"Gildan 5.3 oz. Cotton T-Shirt - Ladies' - Embroidered - White","price":"Prices from $4.29 to $9.55"},{"id":16,"pic":"//cdna.4imprint.com/prod/150/447980.jpg","name":"5.2 oz. Cotton T-Shirt - Youth - Full Color","price":"Prices from $6.89 to $16.49"},{"id":17,"pic":"//cdna.4imprint.com/prod/150/448664.jpg","name":"Gildan 5.3 oz. Cotton T-Shirt - Ladies' - Full Color - Color","price":"Prices from $7.95 to $17.85"},{"id":18,"pic":"//cdna.4imprint.com/prod/150/374480.jpg","name":"Hanes ComfortSoft Tee - Men's - Embroidered - Colors","price":"Prices from $5.45 to $10.45"},{"id":19,"pic":"//cdna.4imprint.com/prod/150/451626.jpg","name":"Gildan 6 oz. Ultra Cotton LS T-Shirt - Men's - White - Embroidered","price":"Prices from $8.75 to $16.75"},{"id":20,"pic":"//cdna.4imprint.com/prod/150/378885.jpg","name":"Jerzees Blend 50/50 LS T-Shirt - Screen - Colors","price":"Prices from $6.99 to $13.50"},{"id":21,"pic":"//cdna.4imprint.com/prod/150/328722.jpg","name":"Hanes ComfortSoft Tee - Youth - Screen - Colors","price":"Prices from $3.75 to $9.15"},{"id":22,"pic":"//cdna.4imprint.com/prod/150/331789.jpg","name":"Hanes 50/50 ComfortBlend T-Shirt - Youth - Colors - Screen","price":"Prices from $4.25 to $10.49"},{"id":23,"pic":"//cdna.4imprint.com/prod/150/392345.jpg","name":"Tie-Dye T-Shirt - Two-Tone Spiral - Screen","price":"Prices from $7.35 to $14.25"},{"id":24,"pic":"//cdna.4imprint.com/prod/150/422444.jpg","name":"Port 50/50 Blend T-Shirt - Men's - White - Screen","price":"Prices from $2.99 to $7.99"},{"id":25,"pic":"//cdna.4imprint.com/prod/150/427267.jpg","name":"Hanes ComfortSoft V-Neck Tee - Ladies' - Screen - White","price":"Prices from $4.50 to $11.50"},{"id":26,"pic":"//cdna.4imprint.com/prod/150/376018.jpg","name":"Gildan 5.3 oz. Cotton LS T-Shirt - Embroidered - Colors","price":"Prices from $6.69 to $12.95"},{"id":27,"pic":"//cdna.4imprint.com/prod/150/406550.jpg","name":"All-American Tee - Colors","price":"Prices from $5.99 to $12.50"},{"id":28,"pic":"//cdna.4imprint.com/prod/150/440129.jpg","name":"Port Classic 5.4 oz. T-Shirt - Heathers - Emb","price":"Prices from $5.45 to $10.55"},{"id":29,"pic":"//cdna.4imprint.com/prod/150/374465.jpg","name":"Hanes ComfortSoft Tee - Men's - Embroidered - White","price":"Prices from $3.95 to $8.95"},{"id":30,"name":"All-American Tee with Pocket - White","price":"Prices from $5.99 to $12.25"},{"id":31,"name":"Adult 4.3 oz. Ringspun Cotton T-Shirt - Embroidered","price":"Prices from $4.65 to $9.95"},{"id":32,"name":"Bayside USA Made T-Shirt w/Pocket - White","price":"Prices from $6.55 to $12.95"},{"id":33,"name":"Gildan 5.6 oz. DryBlend 50/50 Pocket T-Shirt - Screen-Colors","price":"Prices from $6.50 to $13.50"},{"id":34,"name":"5.2 oz. Cotton Long Sleeve T-Shirt - Youth - Embroidered","price":"Prices from $4.65 to $11.15"},{"id":35,"pic":"//cdna.4imprint.com/prod/150/368747.jpg","name":"FOL Long Sleeve 100% Cotton T-Shirt - White - Screen","price":"Prices from $4.19 to $9.79"},{"id":36,"pic":"//cdna.4imprint.com/prod/150/368608.jpg","name":"Jerzees Blend 50/50 T-Shirt - Men's - White - Screen","price":"On sale from $2.85 to $7.69"},{"id":37,"pic":"//cdna.4imprint.com/prod/150/447990.jpg","name":"5.2 oz. Cotton Long Sleeve T-Shirt - Youth - Full Color","price":"Prices from $7.95 to $19.25"},{"id":38,"pic":"//cdna.4imprint.com/prod/150/382414.jpg","name":"Gildan 5.6 oz. DryBlend 50/50 LS T-Shirt - White","price":"Prices from $4.75 to $11.25"},{"id":39,"pic":"//cdna.4imprint.com/prod/150/392332.jpg","name":"Tie-Dye T-Shirt - Tonal Spider - Screen","price":"Prices from $7.35 to $14.25"},{"id":40,"pic":"//cdna.4imprint.com/prod/150/440133.jpg","name":"Port Classic 5.4 oz. T-Shirt – White - Emb","price":"Prices from $4.15 to $9.35"},{"id":41,"pic":"//cdna.4imprint.com/prod/150/383423.jpg","name":"Bayside USA Made T-Shirt - White - Screen","price":"Prices from $5.05 to $10.95"},{"id":42,"pic":"//cdna.4imprint.com/prod/150/422287.jpg","name":"All-American Long Sleeve Tee - White","price":"Prices from $7.29 to $14.95"},{"id":43,"pic":"//cdna.4imprint.com/prod/150/383441.jpg","name":"Bayside USA Made Long Sleeve T-Shirt - White","price":"Prices from $6.95 to $13.75"},{"id":44,"pic":"//cdna.4imprint.com/prod/150/451618.jpg","name":"Hanes 50/50 ComfortBlend T-Shirt - Youth - Colors - Emb","price":"Prices from $5.25 to $10.95"},{"id":45,"pic":"//cdna.4imprint.com/prod/150/449711.jpg","name":"FOL Long Sleeve 100% Cotton T-Shirt - Colors - Embroidered","price":"Prices from $7.25 to $14.75"},{"id":46,"pic":"//cdna.4imprint.com/prod/150/391705.jpg","name":"Bayside Union Made LS Pocket T-Shirt - Colors","price":"Prices from $12.25 to $21.25"},{"id":47,"pic":"//cdna.4imprint.com/prod/150/451619.jpg","name":"Hanes 50/50 ComfortBlend T-Shirt - Youth - White - Emb","price":"Prices from $4.25 to $9.25"},{"id":48,"pic":"//cdna.4imprint.com/prod/150/378986.jpg","name":"Hanes LS Beefy-T - Screen - White","price":"Prices from $7.25 to $13.75"},{"id":49,"pic":"//cdna.4imprint.com/prod/150/370282.jpg","name":"Gildan 5.3 oz. Cotton LS T-Shirt - Screen - White","price":"Prices from $3.99 to $9.49"}];
	ctx.rest(dummy);
}

bs.generateSN = async(ctx,next)=>{
	var c=new Date();
	var y=String.fromCharCode(65+parseInt(c.getFullYear().toString().substr(2))-10);
	var m=String.fromCharCode(65+(c.getMonth()+1)+6);
	var tmp="00"+c.getMilliseconds().toString();
	var r=tmp.substr(tmp.length-2)



	var productFromUI={description:'this is discrition from api',
imgs:[{name:'1',url:'//cdna.4imprint.com/prod/300/459298.jpg'},
{name:'2',url:'//cdna.4imprint.com/prod/extras/128981/459298/300/1.jpg'},
{name:'3',url:'//cdna.4imprint.com/prod/extras/128981/459298/300/2.jpg'},
{name:'4',url:'//cdna.4imprint.com/prod/extras/128981/459298/300/3.jpg'}
],
descriptions:[
'Checkpoint friendly construction of the backpack makes it your ideal travel companion!',
'Features a laptop compartment that holds up to a 17" laptop.',
'Laptop compartment unzips flat to make it easier to go through airport security.',
'Zippered main compartment includes a padded compartment for your tablet and is spacious enough for a padfolio and other items such as books or folders.',
'Bottom zippered pocket includes a deluxe organizer for your pens and business cards.',
'Top zippered pocket can fit your phone cables and chargers for tangle-free storage.',
'The top pocket also features an audio exit port for listening to music on the go.',
'Zippers feature easy-to-grab toggles for quick and easy access.',
'Two side mesh pockets hold water bottles accessibly.',
'Adjustable backpack straps and carry handle make carrying the back pack easy and comfortable.',
'Backpack is made of 600D polycanvas with ripstop accents and a honeycomb print.',
'Size: 18-1/2" x 12-3/4" x 6".',
'Your price includes embroidery on the front pocket.',
'One-time tape charge: add $35 for fewer than 24 pieces; free for 24 or more!',
'Maximum number of imprint colors: 12',
'Ready to ship in : 4 business days *.'
],
prices:[{moq:'1000',amount:10.882},{moq:'5000',amount:9.882},{moq:'10000',amount:8.882},{moq:'20000',amount:6.882}]};
	
	var p = new Product(productFromUI);

	var newp = await p.save();

	ctx.rest({x:y+m+r,newp});
}

module.exports = {
	'POST /api/getProductByCategroy': bs.getProductByCategroy,
	'POST /api/getProductById': bs.getProductById,
	'POST /api/searchProduct': bs.searchProduct,
	'GET /api/product/test': bs.generateSN
};