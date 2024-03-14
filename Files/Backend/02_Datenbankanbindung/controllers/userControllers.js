const User = require("../models/User");
const db = require('../config/database');


exports.getAllUsers = async (req, res, next) => {
    try {
        let query = "SELECT * FROM user";
        const result = await db.pool.query(query);

        res.status(200).json({ data: result });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        let query = `SELECT * FROM user WHERE user_id = ${id};`;
        const result = await db.pool.query(query);
        res.status(200).json({ data: result[0] });
    } catch (error) {
        console.log(error);
        next(error);
    }    
};

exports.addUser = async (req, res, next) => {
    try {

        // ACHTUNG bei NULL und NOT NULL Werten!
        const email_address = maskStringValue(req.body.email_address);
        const first_name = maskStringValue(req.body.first_name);
        const last_name = maskStringValue(req.body.last_name);
        const password = maskStringValue(req.body.password);
        const count_of_false_logins = maskStringValue(req.body.count_of_false_logins);
        const blocked_date = maskDateTimeValue(req.body.blocked_date);
        const member_date = maskDateTimeValue(req.body.member_date);
        const telephone_number = maskStringValue(req.body.telephone_number);
        const role_id = maskStringValue(req.body.role_id);
        const street = maskStringValue(req.body.street);
        const house_number = maskStringValue(req.body.house_number);
        const zip_code = maskIntegerValue(req.body.zip_code);
        const city = maskStringValue(req.body.city);
        const country = maskStringValue(req.body.country);

        let query = `
            INSERT INTO user (
                email_address, first_name, last_name, password, count_of_false_logins, 
                blocked_date, member_date, telephone_number, role_id, street,
                house_number, zip_code, city, country
            ) 
            VALUES (
                ${email_address}, ${first_name}, ${last_name}, ${password}, ${count_of_false_logins},
                ${blocked_date}, ${member_date}, ${telephone_number}, ${role_id}, ${street},
                ${house_number}, ${zip_code}, ${city}, ${country}
            );
        `;
        console.log(query);

        const result = await db.pool.query(query);
        const new_id = Number(result.insertId);
        //console.log(result);
        //console.log("InsertId = " + Number(result.insertId));



/*
        // TODO: Constructor verwenden!!!
        let newUser = new User(
            result.insertId,
            req.body.email_address,
            req.body.first_name,
            req.body.password,
            req.body.count_of_false_logins,
            req.body.blocked_date,
            req.body.member_date,
            req.body.telephone_number,
            req.body.role_id, 
            req.body.street,
            req.body.house_number,
            req.body.zip_code,
            req.body.city,
            req.body.country
        );
*/

        let newUser = {
            user_id: new_id,
            email_address: req.body.email_address,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            count_of_false_logins: req.body.count_of_false_logins,
            blocked_date: req.body.blocked_date,
            member_date: req.body.member_date,
            telephone_number: req.body.telephone_number,
            role_id: req.body.role_id,
            street: req.body.street,
            house_number: req.body.house_number,
            zip_code: req.body.zip_code,
            city: req.body.city,
            country: req.body.country
        };
        res.status(200).json({ data:newUser, message: `New user added` });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.updateUserById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const email_address = maskStringValue(req.body.email_address);
        const first_name = maskStringValue(req.body.first_name);
        const last_name = maskStringValue(req.body.last_name);
        const password = maskStringValue(req.body.password);
        const count_of_false_logins = maskStringValue(req.body.count_of_false_logins);
        const blocked_date = maskDateTimeValue(req.body.blocked_date);
        const member_date = maskDateTimeValue(req.body.member_date);
        const telephone_number = maskStringValue(req.body.telephone_number);
        const role_id = maskIntegerValue(req.body.role_id);
        const street = maskStringValue(req.body.street);
        const house_number = maskStringValue(req.body.house_number);
        const zip_code = maskIntegerValue(req.body.zip_code);
        const city = maskStringValue(req.body.city);
        const country = maskStringValue(req.body.country);

        let query = `
            UPDATE user SET
                email_address = ${email_address}, 
                first_name = ${first_name}, 
                last_name = ${last_name}, 
                password = ${password}, 
                count_of_false_logins = ${count_of_false_logins}, 
                blocked_date = ${blocked_date}, 
                member_date = ${member_date}, 
                telephone_number = ${telephone_number}, 
                role_id = ${role_id}, 
                street = ${street}, 
                house_number = ${house_number}, 
                zip_code = ${zip_code}, 
                city = ${city}, 
                country = ${country}
            WHERE user_id = ${id};
        `;

        console.log(query);

        await db.pool.query(query);
        res.status(200).json({ message:`User ${id} updated` });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        let query = `DELETE FROM user WHERE user_id = ${id};`;
        await db.pool.query(query);
        res.status(200).json({ message:`User ${id} deleted` });
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
    if (val != null && val != "") {
        return `STR_TO_DATE('${val}', '%Y-%m-%d %T')`;
        //return `STR_TO_DATE('${val}', '%d.%m.%Y %H:%i')`;
    }
    return null;
}

function maskIntegerValue(val) {
    if (val != null && val != "") {
        return val;
    }
    return null;
}
