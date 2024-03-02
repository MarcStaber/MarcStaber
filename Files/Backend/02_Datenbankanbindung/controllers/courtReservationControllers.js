const db = require('../config/database');


exports.getAllCourtReservations = async (req, res, next) => {
    try {
        let query = "SELECT * FROM court_reservation";
        const result = await db.pool.query(query);

        res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getCourtReservationById = async (req, res, next) => { 
    try {
        const id = req.params.id;
        let query = `SELECT * FROM court_reservation 
                     WHERE reservation_number = ${id};`;
        const result = await db.pool.query(query);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getValidReservation = async (req, res, next) => {
    try {
        const court_id = maskStringValue(req.body.court_id);
        const date_time_from = maskDateTimeValue(req.body.date_time_from);
        const date_time_to = maskDateTimeValue(req.body.date_time_to);

        let query = `
SELECT COUNT(*) 
FROM court_reservation
WHERE court_id = ${court_id}
AND (
    date_time_from BETWEEN ${date_time_from} AND ${date_time_to}
OR
    date_time_to BETWEEN ${date_time_from} AND ${date_time_to}
OR 
    (${date_time_from} <= date_time_to AND ${date_time_to} >= date_time_to)
)`;
        const result = await db.pool.query(query);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
};


exports.addCourtReservation = async (req, res, next) => {
    try {
        const user_id = maskStringValue(req.body.user_id);
        const court_id = maskStringValue(req.body.court_id);
        const date_time_from = maskDateTimeValue(req.body.date_time_from);
        const date_time_to = maskDateTimeValue(req.body.date_time_to);
        const reservation_type_id = maskStringValue(req.body.reservation_type_id);
        const notice = maskStringValue(req.body.notice);
        const cancel_datetime = maskDateTimeValue(req.body.cancel_datetime);

        let query = `
            INSERT INTO court_reservation (
                user_id, court_id, date_time_from, date_time_to, 
                reservation_type_id, notice, cancel_datetime
            ) 
            VALUES (
               ${user_id}, ${court_id}, ${date_time_from}, ${date_time_to}, 
               ${reservation_type_id}, ${notice}, ${cancel_datetime}
            );
        `;
        const result = await db.pool.query(query);
        const new_id = Number(result.insertId);

        let newCourtReservation = {
            reservation_number: new_id,
            user_id: req.body.user_id,
            court_id: req.body.court_id,
            date_time_from: req.body.date_time_from,
            date_time_to: req.body.date_time_to,
            reservation_type_id: req.body.reservation_type_id,
            notice: req.body.notice,
            cancel_datetime: req.body.cancel_datetime
        };
        res.status(200).json(newCourtReservation);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.updateCourtReservationById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user_id = maskStringValue(req.body.user_id);
        const court_id = maskStringValue(req.body.court_id);
        const date_time_from = maskDateTimeValue(req.body.date_time_from);
        const date_time_to = maskDateTimeValue(req.body.date_time_to);
        const reservation_type_id = maskStringValue(req.body.reservation_type_id);
        const notice = maskStringValue(req.body.notice);
        const cancel_datetime = maskDateTimeValue(req.body.cancel_datetime);

        let query = `
            UPDATE court_reservation SET
                user_id = ${user_id},
                court_id = ${court_id},
                date_time_from = ${date_time_from},
                date_time_to = ${date_time_to},
                reservation_type_id = ${reservation_type_id},
                reservation_datetime = CURRENT_TIMESTAMP(),
                notice = ${notice},
                cancel_datetime = ${cancel_datetime}
            WHERE reservation_number = ${id};
        `;
        await db.pool.query(query);
        res.status(200).json(`Court reservation ${id} updated`);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.deleteCourtReservationById = async (req, res, next) => {
    try {
        const id = req.params.id;
        let query = `DELETE FROM court_reservation 
                     WHERE reservation_number = ${id};`;
        await db.pool.query(query);
        res.status(200).send(`Court reservation ${id} deleted`);
    } catch (error) {
        console.log(error);
        next(error);
    }
}






//////////////////////////////////////////////////////////////////////////////////////////
//                         H E L P E R   F U N C T I O N S
//////////////////////////////////////////////////////////////////////////////////////////
function maskStringValue(val) {
    if (val != null) {
        return `'${val}'`;
    }
    return val;
}


// Link: https://mariadb.com/kb/en/str_to_date/#:~:text=STR_TO_DATE()%20returns%20a%20DATETIME,the%20format%20indicated%20by%20format.
function maskDateTimeValue(val) {
    if (val != null) {
        //return `STR_TO_DATE('${val}', '%Y-%m-%d %T')`;
        return `STR_TO_DATE('${val}', '%d.%m.%Y %H:%i')`;
    }
    return val;
}


exports.getBookedHoursByUserId = async (req, res, next) => {
    const user_id = maskStringValue(req.body.user_id);
    const court_id = maskStringValue(req.body.court_id);
    const year = maskDateTimeValue(req.body.year);
    const week_of_year = maskDateTimeValue(req.body.week_of_year);
    
    try {

        let query = `
SELECT COUNT(*) 
FROM booked_hours
WHERE court_id = ${court_id}
AND user_id = ${user_id}
AND year = ${year}
AND week_of_year = ${week_of_year}
)`;
        
        const result = await db.pool.query(query);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
}
