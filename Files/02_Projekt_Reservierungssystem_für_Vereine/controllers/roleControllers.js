const db = require('../config/database');


exports.getAllRoles = async (req, res, next) => {
    try {
        let query = `
            SELECT * 
            FROM role
        `;
        const result = await db.pool.query(query);

        res.status(200).json({ data: result });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getRoleById = async (req, res, next) => {
    try {
        const id = req.params.id;
        let query = `
            SELECT * 
            FROM role 
            WHERE role_id = ${id}
        `;
        const result = await db.pool.query(query);
        res.status(200).json({ data: result });
    } catch (error) {
        console.log(error);
        next(error);
    }    
};

function maskStringValue(val){
    if (val != null){
        return `"${val}"`;
    }
    return val;
}


exports.addRole = async (req, res, next) => {
    try {
        const role = maskStringValue(req.body.role);

        let query = `
            INSERT INTO role (
                role
            ) 
            VALUES (
                ${role}
            )
        `;
        const result = await db.pool.query(query);
        const new_id = Number(result.insertId);

        let newRole = {
            role_id: new_id,
            role: req.body.role
        };
        res.status(200).json({data: newRole, message: `New role "${newRole.role}" added`});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.updateRoleById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const role = maskStringValue(req.body.role);

        let query = `
            UPDATE role 
            SET role = ${role}
            WHERE role_id = ${id}
        `;
        await db.pool.query(query);
        res.status(200).json({message: `Role ${id} updated`});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.deleteRoleById = async (req, res, next) => {
    try {
        const id = req.params.id;
        let query = `
            DELETE FROM role 
            WHERE role_id = ${id}
        `;
        await db.pool.query(query);
        res.status(200).json({message: `Role ${id} deleted`});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

