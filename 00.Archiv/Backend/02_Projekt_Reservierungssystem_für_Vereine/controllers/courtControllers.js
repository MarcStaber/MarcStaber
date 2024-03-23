const db = require('../config/database');


exports.getAllCourts = async (req, res, next) => {
    try {
        let query = "SELECT * FROM court";
        const result = await db.pool.query(query);

        res.status(200).json({ data: result });
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
        // result is a list with only one element
        res.status(200).json({ data: result[0] });
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
        res.status(200).json({ data: newCourt, message: "New court inserted" });
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

        const c = {
            court_id: id,
            court: court
        };
        res.status(200).json({data: c, message: `Court ${id} updated`});
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
        res.status(200).json({message: `Court ${id} deleted`});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

