'use strict';

var server = require('server');
var csrfProtection = require("*/cartridge/scripts/middleware/csrf");
server.get('Show', csrfProtection.generateToken, function (req, res, next){
    var URLUtils = require('dw/web/URLUtils');
    var form = server.forms.getForm('newsletter');
    res.render('/newsletter/newsletter', {
        form: form,
        actionURL: URLUtils.url('Newsletter-Submit').toString()
    });
    next();
 });

server.post('Submit', function (req, res, next){
    var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');
    var PromotionMgr = require('dw/campaign/PromotionMgr');
    var viewData = res.getViewData();
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var Transaction = require('dw/system/Transaction');

    var fields = req.form;
    var name = fields.firstName;
    var lastname = fields.lastName;
    var email = fields.email;
    var coupons = PromotionMgr.getCampaign('exemplo').getCoupons().toArray();
    var coupon;
    var mailTemplateLocation = 'checkout/confirmation/newsletter-email.isml';
    var unavaliableMail = 'checkout/confirmation/newsletter-email-error.isml'
    for (var i = 0; i < coupons.length; i++) {
        if (coupons[i].ID == 'exemplo') {
            coupon = coupons[i];
        }
    }
    var usedEmail = CustomObjectMgr.getCustomObject('newsletter', email);
    if (!usedEmail) {
        Transaction.wrap(function () {
            var customObject = CustomObjectMgr.createCustomObject('newsletter', email);
            var currentCouponCode = coupon.getNextCouponCode();
            customObject.custom.name = name;
            customObject.custom.lastname = lastname;
            customObject.custom.coupon = currentCouponCode;

            var emailObj = {
                to: email,
                subject: "Confirmação de Newsletter",
                from: "noreply@salesforce.com"
            }

            var context = {
                firstName: name,
                lastName: lastname,
            }
            if (currentCouponCode == null) {

                emailHelpers.send(emailObj, unavaliableMail , context);

            } else {

                emailHelpers.send(emailObj, mailTemplateLocation , context);
            }
        }
    )}
    next();
});

module.exports = server.exports();
