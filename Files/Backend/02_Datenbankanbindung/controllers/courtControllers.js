//const User = require("../models/user");
const db = require('../config/database');


exports.getAllCourts = async (req, res, next) => {
    try {
        let query = "SELECT * FROM court";
        const result = await db.pool.query(query);

        res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getCourtById = async (req, res, next) => {
    try {
        const id = req.params.id;
        let query = `SELECT * FROM court WHERE court_id = ${id};`;
        const result = await db.pool.query(query);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }    
};

function maskStringValue(val){
    if (val != null){
        return "'" + val + "'";
    }
    return val;
}


exports.addCourt = async (req, res, next) => {
    try {
        const court = maskStringValue(req.body.court);

        let query = `
            INSERT INTO court (
                court
            ) 
            VALUES (
                ${court}
            );
        `;
        const result = await db.pool.query(query);
        const new_id = Number(result.insertId);

        let newCourt = {
            court_id: new_id,
            court: req.body.court
        };
        res.status(200).json(newCourt);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.updateCourtById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const court = maskStringValue(req.body.court);

        let query = `
            UPDATE court 
            SET court = ${court}
            WHERE court_id = ${id};
        `;
        await db.pool.query(query);
        res.status(200).json(`Court ${id} updated`);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.deleteCourtById = async (req, res, next) => {
    try {
        const id = req.params.id;
        let query = `DELETE FROM court WHERE court_id = ${id};`;
        await db.pool.query(query);
        res.status(200).send(`Court ${id} deleted`);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

