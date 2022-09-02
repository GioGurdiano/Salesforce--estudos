'use strict';

var server = require('server');
server.extend(module.superModule);

server.append('Show', function (req, res, next){

    var viewData = res.getViewData();
    var currentPrice = viewData.product.price.list.value;
    var salesPrice = viewData.product.price.sales.value;
    var salePercent = ((currentPrice - salesPrice) / currentPrice) * 100;
    viewData.product.salePercent = salePercent.toFixed([0]);
    res.setViewData(viewData);

    next();
})



module.exports = server.exports();
