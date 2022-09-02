'use strict';

var server = require('server');
server.extend(module.superModule);

server.append('Show', function (req, res, next){

    var viewData = res.getViewData();
    var CatalogMgr = require('dw/catalog/CatalogMgr');
    var ProductMgr = require('dw/catalog/ProductMgr');
    var ProductSearchModel = require('dw/catalog/ProductSearchModel');
    var PagingModel = require('dw/web/PagingModel');

    var product = ProductMgr.getProduct(req.querystring.pid);
    var category = product.getPrimaryCategory();
    var sortingRule = CatalogMgr.getSortingRule('price-low-to-high');
    var apiProductSearch = new ProductSearchModel();
    apiProductSearch.setSortingRule(sortingRule);
    apiProductSearch.setCategoryID(category.ID);
    apiProductSearch.search();
    var pagingModel = new PagingModel(apiProductSearch.getProductSearchHits(), apiProductSearch.count);
    pagingModel.setStart(0);
    pagingModel.setPageSize(4);
    var products = pagingModel.pageElements.asList();
    viewData.products = products;
    res.setViewData(viewData);
    next();
})



module.exports = server.exports();
