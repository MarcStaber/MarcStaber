//const User = require("../models/user");
const db = require('../config/database');


exports.getAllAddressLookups = async (req, res, next) => {
    try {
        let query = "SELECT * FROM address_lookup";
        const result = await db.pool.query(query);

        res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getAddressLookupById = async (req, res, next) => {
    try {
        const id = req.params.id;
        let query = `SELECT * FROM address_lookup WHERE id = ${id};`;
        const result = await db.pool.query(query);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

function maskStringValue(val) {
    if (val != null) {
        return "'" + val + "'";
    }
    return val;
}


exports.addAddressLookup = async (req, res, next) => {
    try {
        const street = maskStringValue(req.body.street);
        const zip_code = maskStringValue(req.body.zip_code);
        const city = maskStringValue(req.body.city);
        const country = maskStringValue(req.body.country);

        let query = `
            INSERT INTO address_lookup (
                street, zip_code, city, country
            ) 
            VALUES (
               ${street}, ${zip_code}, ${city}, ${country}
            );
        `;
        const result = await db.pool.query(query);
        const new_id = Number(result.insertId);

        let newAddressLookup = {
            id: new_id,
            street: req.body.street,
            zip_code: req.body.zip_code,
            city: req.body.city,
            country: req.body.date_time_to,
        };
        res.status(200).json(newAddressLookup);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.updateAddressLookupById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const street = maskStringValue(req.body.street);
        const zip_code = maskStringValue(req.body.zip_code);
        const city = maskStringValue(req.body.city);
        const country = maskStringValue(req.body.country);

        let query = `
            UPDATE address_lookup SET
                street = ${street},
                zip_code = ${zip_code},
                city = ${city},
                country = ${country}
            WHERE id = ${id};
        `;
        await db.pool.query(query);
        res.status(200).json(`Address Lookup ${id} updated`);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.deleteAddressLookupById = async (req, res, next) => {
    try {
        const id = req.params.id;
        let query = `DELETE FROM address_lookup WHERE id = ${id};`;
        await db.pool.query(query);
        res.status(200).send(`Address Lookup ${id} deleted`);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

