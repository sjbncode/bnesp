var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var ProductTemp = mongoose.model('ProductTemp');

var bs = {};
bs.getProductByCategroy = async(ctx, next) => {
    var params = ctx.request.body;
    var category = params.category;

    var query = {};
    if (category) {
        query = {
            category: {
                $in: [category]
            }
        }
    }
    var projection = {
        _id: 0,
        pid: 1,
        name: 1,
        "imgs.path": 1,
        "prices.amount": 1
    };
    var options = populateOptions(params);
    var dummy = await Product.find(query, projection, options);
    ctx.rest(dummy);
};
bs.getProductById = async(ctx, next) => {
    var pid = ctx.request.body.pid;
    var product = await Product.findOne({
        pid: pid
    });
    ctx.rest(product);
}
bs.searchProduct = async(ctx, next) => {
    var params = ctx.request.body;
    var query = populateQuery(params);
    var options = populateOptions(params);
    var projection = {
        _id: 0,
        pid: 1,
        name: 1,
        "imgs.path": 1,
        "prices.amount": 1
    };
    var dummy = await Product.find(query, projection, options);
    ctx.rest(dummy);
}
bs.searchProductCount = async(ctx, next) => {
    var params = ctx.request.body;
    var query = populateQuery(params);
    var dummy = await Product.count(query);
    ctx.rest(dummy);
}
var populateQuery = function(params) {
    var filter = params.filter;
    var query = {};

    if (filter) {
        query = {
            $or: [{
                pid: new RegExp(filter, 'i')
            }, {
                name: new RegExp(filter, 'i')
            }, {
                category: {
                    $in: [new RegExp(filter, 'i')]
                }
            }]
        }
    }

    var categories = params.categories;
    if (categories && categories.length) {
        query.category = {
            $in: categories
        }
    }

    var prices = params.priceFilter;
    if (prices && prices.length > 1) {
        var min = prices[0];
        var max = prices[1];
        if (min != 0 || max != 50)
            query["prices.amount"] = {};
        if (min != 0) {
            query["prices.amount"]["$gte"] = min;
        }
        if (max != 50) {
            query["prices.amount"]["$lte"] = max;
        }
    }

    var colors = params.colors;
    if (colors && colors.length > 0) {
        query.colors = {
            $in: colors
        }
    }
    return query;
}
var populateOptions = function(params) {
    var options = {};
    if (params.skip) {
        options.skip = params.skip;
    }
    if (params.limit) {
        options.limit = params.limit;
    }
    return options
}
bs.saveProduct = async(ctx, next) => {
    var product = ctx.request.body.product;
    var p = new Product(product);
    await p.setSN();
    var newp = await Product.findOneAndUpdate({
        pid: p.pid
    }, p, {
        upsert: true
    })
    ctx.rest({
        Status: 'OK',
        pid: p.pid
    });
}
bs.test = async(ctx, next) => {

    var dummy = [{
        "pid": 0,
        "pic": "uploads/product/451624.jpg",
        "name": "Gildan 6 oz. Ultra Cotton T-Shirt - Youth - White - Embroidered",
        "price": "Prices from $4.50 to $10.75"
    }, {
        "pid": 1,
        "pic": "uploads/product/365463.jpg",
        "name": "Gildan 6 oz. Ultra Cotton LS T-Shirt - Men's - White - Screen",
        "price": "Prices from $5.75 to $11.75"
    }, {
        "pid": 2,
        "pic": "uploads/product/404972.jpg",
        "name": "Gildan 5.3 oz. Cotton T-Shirt - Ladies' - Embroidered - Colors",
        "price": "Prices from $4.75 to $10.25"
    }, {
        "pid": 3,
        "pic": "uploads/product/440159.jpg",
        "name": "Anvil Ringspun 5.4 oz. T-Shirt - Ladies' - White",
        "price": "Prices from $3.35 to $8.29"
    }, {
        "pid": 4,
        "pic": "uploads/product/370137.jpg",
        "name": "Jerzees Blend 50/50 T-Shirt - Youth - White",
        "price": "Prices from $2.99 to $6.75"
    }, {
        "pid": 5,
        "pic": "uploads/product/369913.jpg",
        "name": "Champion Tagless T-Shirt - Embroidered - White",
        "price": "Prices from $5.65 to $11.39"
    }, {
        "pid": 6,
        "pic": "uploads/product/328716.jpg",
        "name": "Hanes ComfortSoft Tee - Men's - Screen - Colors",
        "price": "Prices from $4.74 to $9.70"
    }, {
        "pid": 7,
        "pic": "uploads/product/422280.jpg",
        "name": "All-American Long Sleeve Tee - Colors",
        "price": "Prices from $8.50 to $16.85"
    }, {
        "pid": 8,
        "pic": "uploads/product/420523.jpg",
        "name": "Gildan 5.3 oz. Cotton LS T-Shirt - Ladies' - Screen - Colors",
        "price": "Prices from $6.24 to $11.75"
    }, {
        "pid": 9,
        "pic": "uploads/product/368599.jpg",
        "name": "Jerzees Cotton T-Shirt - White - Screen",
        "price": "Prices from $2.49 to $6.25"
    }, {
        "pid": 10,
        "pic": "uploads/product/448044.jpg",
        "name": "Gildan SoftStyle T-Shirt - Men's - FC - White",
        "price": "Prices from $5.99 to $11.75"
    }, {
        "pid": 11,
        "pic": "uploads/product/391672.jpg",
        "name": "Bayside Union Made Pocket T-Shirt - Colors",
        "price": "Prices from $8.95 to $16.75"
    }, {
        "pid": 12,
        "pic": "uploads/product/368557.jpg",
        "name": "Gildan 5.6 oz. DryBlend 50/50 T-Shirt - Screen - White",
        "price": "Prices from $2.69 to $7.99"
    }, {
        "pid": 13,
        "pic": "uploads/product/368394.jpg",
        "name": "Hanes 50/50 ComfortBlend T-Shirt - Youth - White - Screen",
        "price": "Prices from $2.75 to $8.25"
    }, {
        "pid": 14,
        "pic": "uploads/product/440166.jpg",
        "name": "Anvil Ringspun 5.4 oz. T-Shirt - Men's - Colors",
        "price": "Prices from $4.09 to $9.55"
    }, {
        "pid": 15,
        "pic": "uploads/product/404967.jpg",
        "name": "Gildan 5.3 oz. Cotton T-Shirt - Ladies' - Embroidered - White",
        "price": "Prices from $4.29 to $9.55"
    }, {
        "pid": 16,
        "pic": "uploads/product/447980.jpg",
        "name": "5.2 oz. Cotton T-Shirt - Youth - Full Color",
        "price": "Prices from $6.89 to $16.49"
    }, {
        "pid": 17,
        "pic": "uploads/product/448664.jpg",
        "name": "Gildan 5.3 oz. Cotton T-Shirt - Ladies' - Full Color - Color",
        "price": "Prices from $7.95 to $17.85"
    }, {
        "pid": 18,
        "pic": "uploads/product/374480.jpg",
        "name": "Hanes ComfortSoft Tee - Men's - Embroidered - Colors",
        "price": "Prices from $5.45 to $10.45"
    }, {
        "pid": 19,
        "pic": "uploads/product/451626.jpg",
        "name": "Gildan 6 oz. Ultra Cotton LS T-Shirt - Men's - White - Embroidered",
        "price": "Prices from $8.75 to $16.75"
    }, {
        "pid": 20,
        "pic": "uploads/product/378885.jpg",
        "name": "Jerzees Blend 50/50 LS T-Shirt - Screen - Colors",
        "price": "Prices from $6.99 to $13.50"
    }, {
        "pid": 21,
        "pic": "uploads/product/328722.jpg",
        "name": "Hanes ComfortSoft Tee - Youth - Screen - Colors",
        "price": "Prices from $3.75 to $9.15"
    }, {
        "pid": 22,
        "pic": "uploads/product/331789.jpg",
        "name": "Hanes 50/50 ComfortBlend T-Shirt - Youth - Colors - Screen",
        "price": "Prices from $4.25 to $10.49"
    }, {
        "pid": 23,
        "pic": "uploads/product/392345.jpg",
        "name": "Tie-Dye T-Shirt - Two-Tone Spiral - Screen",
        "price": "Prices from $7.35 to $14.25"
    }, {
        "pid": 24,
        "pic": "uploads/product/422444.jpg",
        "name": "Port 50/50 Blend T-Shirt - Men's - White - Screen",
        "price": "Prices from $2.99 to $7.99"
    }, {
        "pid": 25,
        "pic": "uploads/product/427267.jpg",
        "name": "Hanes ComfortSoft V-Neck Tee - Ladies' - Screen - White",
        "price": "Prices from $4.50 to $11.50"
    }, {
        "pid": 26,
        "pic": "uploads/product/376018.jpg",
        "name": "Gildan 5.3 oz. Cotton LS T-Shirt - Embroidered - Colors",
        "price": "Prices from $6.69 to $12.95"
    }, {
        "pid": 27,
        "pic": "uploads/product/406550.jpg",
        "name": "All-American Tee - Colors",
        "price": "Prices from $5.99 to $12.50"
    }, {
        "pid": 28,
        "pic": "uploads/product/440129.jpg",
        "name": "Port Classic 5.4 oz. T-Shirt - Heathers - Emb",
        "price": "Prices from $5.45 to $10.55"
    }, {
        "pid": 29,
        "pic": "uploads/product/374465.jpg",
        "name": "Hanes ComfortSoft Tee - Men's - Embroidered - White",
        "price": "Prices from $3.95 to $8.95"
    }, {
        "pid": 30,
        "name": "All-American Tee with Pocket - White",
        "price": "Prices from $5.99 to $12.25"
    }, {
        "pid": 31,
        "name": "Adult 4.3 oz. Ringspun Cotton T-Shirt - Embroidered",
        "price": "Prices from $4.65 to $9.95"
    }, {
        "pid": 32,
        "name": "Bayside USA Made T-Shirt w/Pocket - White",
        "price": "Prices from $6.55 to $12.95"
    }, {
        "pid": 33,
        "name": "Gildan 5.6 oz. DryBlend 50/50 Pocket T-Shirt - Screen-Colors",
        "price": "Prices from $6.50 to $13.50"
    }, {
        "pid": 34,
        "name": "5.2 oz. Cotton Long Sleeve T-Shirt - Youth - Embroidered",
        "price": "Prices from $4.65 to $11.15"
    }, {
        "pid": 35,
        "pic": "uploads/product/368747.jpg",
        "name": "FOL Long Sleeve 100% Cotton T-Shirt - White - Screen",
        "price": "Prices from $4.19 to $9.79"
    }, {
        "pid": 36,
        "pic": "uploads/product/368608.jpg",
        "name": "Jerzees Blend 50/50 T-Shirt - Men's - White - Screen",
        "price": "On sale from $2.85 to $7.69"
    }, {
        "pid": 37,
        "pic": "uploads/product/447990.jpg",
        "name": "5.2 oz. Cotton Long Sleeve T-Shirt - Youth - Full Color",
        "price": "Prices from $7.95 to $19.25"
    }, {
        "pid": 38,
        "pic": "uploads/product/382414.jpg",
        "name": "Gildan 5.6 oz. DryBlend 50/50 LS T-Shirt - White",
        "price": "Prices from $4.75 to $11.25"
    }, {
        "pid": 39,
        "pic": "uploads/product/392332.jpg",
        "name": "Tie-Dye T-Shirt - Tonal Spider - Screen",
        "price": "Prices from $7.35 to $14.25"
    }, {
        "pid": 40,
        "pic": "uploads/product/440133.jpg",
        "name": "Port Classic 5.4 oz. T-Shirt – White - Emb",
        "price": "Prices from $4.15 to $9.35"
    }, {
        "pid": 41,
        "pic": "uploads/product/383423.jpg",
        "name": "Bayside USA Made T-Shirt - White - Screen",
        "price": "Prices from $5.05 to $10.95"
    }, {
        "pid": 42,
        "pic": "uploads/product/422287.jpg",
        "name": "All-American Long Sleeve Tee - White",
        "price": "Prices from $7.29 to $14.95"
    }, {
        "pid": 43,
        "pic": "uploads/product/383441.jpg",
        "name": "Bayside USA Made Long Sleeve T-Shirt - White",
        "price": "Prices from $6.95 to $13.75"
    }, {
        "pid": 44,
        "pic": "uploads/product/451618.jpg",
        "name": "Hanes 50/50 ComfortBlend T-Shirt - Youth - Colors - Emb",
        "price": "Prices from $5.25 to $10.95"
    }, {
        "pid": 45,
        "pic": "uploads/product/449711.jpg",
        "name": "FOL Long Sleeve 100% Cotton T-Shirt - Colors - Embroidered",
        "price": "Prices from $7.25 to $14.75"
    }, {
        "pid": 46,
        "pic": "uploads/product/391705.jpg",
        "name": "Bayside Union Made LS Pocket T-Shirt - Colors",
        "price": "Prices from $12.25 to $21.25"
    }, {
        "pid": 47,
        "pic": "uploads/product/451619.jpg",
        "name": "Hanes 50/50 ComfortBlend T-Shirt - Youth - White - Emb",
        "price": "Prices from $4.25 to $9.25"
    }, {
        "pid": 48,
        "pic": "uploads/product/378986.jpg",
        "name": "Hanes LS Beefy-T - Screen - White",
        "price": "Prices from $7.25 to $13.75"
    }, {
        "pid": 49,
        "pic": "uploads/product/370282.jpg",
        "name": "Gildan 5.3 oz. Cotton LS T-Shirt - Screen - White",
        "price": "Prices from $3.99 to $9.49"
    }];
    var descriptions = [
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
    ];
    var prices = [{
        moq: '1000',
        amount: 10.882
    }, {
        moq: '5000',
        amount: 9.882
    }, {
        moq: '10000',
        amount: 8.882
    }, {
        moq: '20000',
        amount: 6.882
    }];

    for (var i = dummy.length - 1; i >= 0; i--) {
        var d = dummy[i]
        var newimgs = [];
        newimgs.push({
            path: d.pic
        });
        newimgs.push({
            path: 'uploads/product/2b9eee476830f.jpg'
        });
        var productFromUI = {
            descriptions,
            prices,
            name: d.name,
            imgs: newimgs,
            "category": ["Apparel", "T-Shirts"]
        }

        var p = new Product(productFromUI);
        await p.setSN();
        var newp = await Product.findOneAndUpdate({
            pid: p.pid
        }, p, {
            upsert: true
        })
        if (d.pic) {

            var file = d.pic.replace('uploads/product/', '');
            download('http://cdna.4imprint.com/prod/150/' + file, './uploads/product/' + file, function() {
                console.log('done');
            });
        }
    }


    ctx.rest({
        x: 'OK'
    });
}

var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        console.log(err);
        // console.log(res);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};


bs.loadtest = async(ctx, next) => {
    console.log(ctx.request.body);
    ctx.rest({
        Status: 'OK'
    });
}
bs.loadProductTemp = async(ctx, next) => {
    var product = ctx.request.body.product;
    console.log(JSON.stringify(product))
    var p = new ProductTemp(product);
    p.save();
    ctx.rest({
        Status: 'OK'
    });
}
bs.loadProductsTemp = async(ctx, next) => {
        var products = ctx.request.body.products;
        console.log('xxx:'+products.length)
        if (products && products.length > 0) {
            console.log(products[0].category);
            for (var i = products.length - 1; i >= 0; i--) {
                var product = products[i];
                var p = new ProductTemp(product);
                p.save();
            }
            ctx.rest({
                Status: 'OK'
            });
        } else {
            ctx.rest({
                Status: 'Error'
            });
        }
    }

bs.getTempProducts = async(ctx, next) => {
    var query = {descriptions:{$size:0}};
    var options={};
    options.limit = 10;
    var dummy = await ProductTemp.find(query, {}, options);
    console.log(dummy.length)
    ctx.rest(dummy);
}
bs.saveTempProducts = async(ctx, next) => {
    var product = ctx.request.body.product;
    var p = new ProductTemp(product);
    // await p.setSN();
    var newp = await ProductTemp.findOneAndUpdate({
        detailUrl: p.detailUrl
    }, p, {
        upsert: true
    })
    ctx.rest({
        Status: 'OK'
    });
}
    // download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
    //   console.log('done');
    // });

module.exports = {
    'POST /api/getProductByCategroy': bs.getProductByCategroy,
    'POST /api/getProductById': bs.getProductById,
    'POST /api/searchProduct': bs.searchProduct,
    'POST /api/searchProductCount': bs.searchProductCount,
    'POST /api/saveProduct': bs.saveProduct,
    'GET /api/product/test': bs.test,
    'POST /api/product/loadtest': bs.loadProductTemp,
    'POST /api/product/loadtest2': bs.loadProductsTemp,
    'POST /api/product/loadtest3': bs.getTempProducts,
    'POST /api/product/loadtest4': bs.saveTempProducts,
};