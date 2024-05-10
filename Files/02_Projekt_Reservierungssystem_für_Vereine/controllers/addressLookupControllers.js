const db = require('../config/database');


exports.getAllAddressLookups = async (req, res, next) => {
    try {

        const street = maskStringValueLike(req.body.street, "street");
        const zip_code = maskStringValueLike(req.body.zip_code, "zip_code");
        const city = maskStringValueLike(req.body.city, "city");

        let query = "SELECT UNIQUE street, zip_code, city, country FROM address_lookup WHERE 1=1 " + street + zip_code + city;
        console.log(query);

        const result = await db.pool.query(query);

        res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

function maskStringValueLike(val, fieldname) {
    if (val != null) {
        return " AND LOWER(" + fieldname + ") LIKE '%" + val.toLowerCase() + "%' ";
    }
    return "";
}
