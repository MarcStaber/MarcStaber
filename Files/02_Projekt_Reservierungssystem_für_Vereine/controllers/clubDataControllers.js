const db = require('../config/database');


exports.getAllClubData = async (req, res, next) => {
    try {
        let query = "SELECT * FROM club_data";
        const result = await db.pool.query(query);

        res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getClubDataById = async (req, res, next) => {
    try {
        const id = req.params.id;
        let query = `SELECT * FROM club_data WHERE id = ${id};`;
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


exports.addClubData = async (req, res, next) => {
    try {
        const significance = maskStringValue(req.body.significance);
        const characteristic = maskStringValue(req.body.characteristic);

        let query = `
            INSERT INTO club_data (
                significance, characteristic
            ) 
            VALUES (
                ${significance}, ${characteristic}
            );
        `;
        const result = await db.pool.query(query);
        const new_id = Number(result.insertId);

        let newClubData = {
            id: new_id,
            significance: req.body.significance,
            characteristic: req.body.characteristic
        };
        res.status(200).json(newClubData);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.updateClubDataById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const significance = maskStringValue(req.body.significance);
        const characteristic = maskStringValue(req.body.characteristic);

        let query = `
            UPDATE club_data SET
            significance = ${significance},
            characteristic = ${characteristic}
            WHERE id = ${id};
        `;
        await db.pool.query(query);
        res.status(200).json(`Club data ${id} updated`);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.deleteClubDataById = async (req, res, next) => {
    try {
        const id = req.params.id;
        let query = `DELETE FROM club_data WHERE id = ${id};`;
        await db.pool.query(query);
        res.status(200).send(`Club data ${id} deleted`);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

