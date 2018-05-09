// Utility functions
module.exports = {
    /**
     *
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    checkLogin: function(req, res, next){
        return undefCheck(req.session.user_id);
    },

    /**
     *
     * @param fields
     * @returns {*}
     */
    testCreateRestaurantInput: function(fields){
        const doorNumber = fields.doorNumber;
        const postcode = fields.postcode;
        const phoneNo = fields.phoneNo;
        const name = fields.name;
        const description = fields.description;
        const tags = fields.tags;
        const websiteURL = fields.websiteURL;
        const price = fields.price;
        const cuisines = fields.cuisines;

        return undefCheck(doorNumber) && undefCheck(postcode) && undefCheck(name)
            && undefCheck(tags) && undefCheck(websiteURL)
            && undefCheck(phoneNo) && undefCheck(description);
    },

};

/**
 *
 * @param x
 * @returns {boolean}
 */
function undefCheck(x){
    return typeof x != "undefined";
}