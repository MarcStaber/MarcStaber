//const User = require("../models/user");
const db = require('../config/database');


exports.getAllReservationTypes = async (req, res, next) => {
    try {
        let query = "SELECT * FROM reservation_type";
        const result = await db.pool.query(query);

        res.status(200).json({ data: result });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getReservationTypeById = async (req, res, next) => {
    try {
        const id = req.params.id;
        let query = `SELECT * FROM reservation_type WHERE reservation_type_id = ${id};`;
        const result = await db.pool.query(query);
        res.status(200).json({ data: result });
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


exports.addReservationType = async (req, res, next) => {
    try {
        const reservation_type = maskStringValue(req.body.reservation_type);
        const admin_rights = maskStringValue(req.body.admin_rights);

        let query = `
            INSERT INTO reservation_type (
                reservation_type, admin_rights
            ) 
            VALUES (
                ${reservation_type}, ${admin_rights}
            );
        `;
        const result = await db.pool.query(query);
        const new_id = Number(result.insertId);

        let newReservationType = {
            reservation_type_id: new_id,
            reservation_type: req.body.reservation_type,
            admin_rights: req.body.admin_rights
        };
        res.status(200).json({data: newReservationType, message: `New Reservation Type "${newReservationType.reservation_type}" and Admin rights "${newReservationType.admin_rights}" added`});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.updateReservationTypeById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const reservation_type = maskStringValue(req.body.reservation_type);
        const admin_rights = maskStringValue(req.body.admin_rights);

        let query = `
            UPDATE reservation_type SET
                reservation_type = ${reservation_type},
                admin_rights = ${admin_rights}
            WHERE reservation_type_id = ${id};
        `;
        await db.pool.query(query);
        res.status(200).json({message: `Reservation type ${id} updated`});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.deleteReservationTypeById = async (req, res, next) => {
    try {
        const id = req.params.id;
        let query = `DELETE FROM reservation_type WHERE reservation_type_id = ${id};`;
        await db.pool.query(query);
        res.status(200).send({message: `Reservation type ${id} delete`});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

