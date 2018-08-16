// Utility functions
module.exports = {
    /**
     * Checks if the user is logged in
     * @param req the request
     * @param res the response
     * @param next
     * @returns {boolean} true if req.session.user_id is not undefined
     */
    checkLogin: function(req, res, next){
        return undefCheck(req.session.user_id);
    },

    /**
     * Ensures the the create restaurant input is all valid
     * @param fields
     * @returns {boolean} true if none of the options are undefined
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
 * Check for undefined
 * @param x the variable to be checked
 * @returns {boolean} true if not undefined
 */
function undefCheck(x){
    return typeof x != "undefined";
}