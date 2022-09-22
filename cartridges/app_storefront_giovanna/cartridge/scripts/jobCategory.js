var File = require("dw/io/File");
var FileWriter = require("dw/io/FileWriter");
var XMLStreamWriter = require("dw/io/XMLStreamWriter");
var ProductMgr = require("dw/catalog/ProductMgr");
var CatalogMgr = require('dw/catalog/CatalogMgr');

exports.execute = function(args) {
    // Brand from job parameters
    var brand = args.brand;
    var catalog = CatalogMgr.getCatalog('storefront-catalog-m-en')
    var products = ProductMgr.queryProductsInCatalog(catalog);
    var productsWithBrand = [];

    while (products.hasNext()) {
        var product = products.next();

        // Collect all products with a specific brand
        if (product.brand == brand) {
            productsWithBrand.push(product);
        }
    }

    // Save XML on: /on/demandware.servlet/webdav/Sites/Impex/src/exports/categoryAssign.xml
    var impexPath =
        File.IMPEX + File.SEPARATOR + "src" + File.SEPARATOR + "exports" + File.SEPARATOR + "categoryAssign.xml";
    var file = new File(impexPath);
    var fileWriter = new FileWriter(file, "UTF-8");
    var xsw = new XMLStreamWriter(fileWriter);

    /* The code below should write a XML similar to this onde:

<?xml version="1.0" encoding="UTF-8"?>
<catalog xmlns="http://www.demandware.com/xml/impex/catalog/2006-10-31" catalog-id="apparel-catalog">
	<category-assignment category-id="womens-clothing-tops" product-id="008884303989">
        <primary-flag>true</primary-flag>
    </category-assignment>
</catalog>

    */

    xsw.writeStartDocument("UTF-8", "1.0");
    xsw.writeStartElement("catalog");
    xsw.writeAttribute("xmlns", "http://www.demandware.com/xml/impex/catalog/2006-10-31");
    xsw.writeAttribute("catalog-id", "storefront-catalog-m-en");

        for (var i = 0; i < productsWithBrand.length; i++){
        xsw.writeStartElement("category-assignment");
            xsw.writeAttribute('category-id', productsWithBrand[i].allCategories[0].ID);
            xsw.writeAttribute('product-id', productsWithBrand[i].ID)
                xsw.writeStartElement('primary-flag')
                    xsw.writeCharacters('true');
                xsw.writeEndElement();
            xsw.writeEndElement();
        }

    xsw.writeEndElement();
    xsw.writeEndDocument();
    xsw.flush()
    xsw.close();
    fileWriter.close();
};
