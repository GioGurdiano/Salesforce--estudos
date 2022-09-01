'use strict';

var server = require('server');
server.extend(module.superModule);

server.append('AddProduct', function (req, res, next){
    var viewData = res.getViewData();
    var ProductMgr = require('dw/catalog/ProductMgr');

    var productId = req.form.pid;
    var product = ProductMgr.getProduct(productId);
    var images = product.getImages('medium');
    var productName = product.name;
    var productPrice =  product.priceModel.price;
    var productCode = productPrice.currencyCode;
    var productDescription = product.longDescription;
    var productQuantityTotal = viewData.quantityTotal;
    var time = String(product.creationDate);
    var subTotal = viewData.cart.totals.subTotal;
    var context = {
        productName: productName,
        productImg0: images[0].absURL,
        productPrice: productPrice,
        productCode: productCode,
        productDescription: productDescription,
        productQuantityTotal: productQuantityTotal,
        productId: productId,
        time: time,
        subTotal: subTotal

    }

    var emailHelper = require('*/cartridge/scripts/helpers/emailHelpers')
    var email = {
        to: "rodrigo.soares@alphasquad.cx",
        subject: "Confirmação de Pedido",
        from: "noreply@salesforce.com"
    }
     var template = 'checkout/confirmation/emailTeste.isml'

    // emailHelper.send(email, template, context)


    res.setViewData(viewData);

    return next();
})

module.exports = server.exports();
