class role {
    constructor(role_id, role_name) {
        this.role_id = role_id;
        this.role_name = role_name;
    }

    /////////////////////////////////////////////////////////////////////////////////
        // getter und setter
    get role_id() {
        return this._role_id;
    }
    set role_id(role_id) {
        this._role_id = role_id;
    }
    get role_name() {
        return this._role_name;
    }
    set role_name(role_name) {
        this._role_name = role_name;
    }

    // Über die Weihnachten geschriebene wurden reinkopiert 
        // noch nicht geteste
        /////////////////////////////////////////////////////////////////////////////////
        // to's

    toString() {
        return this.role_name;
    }
    toArray() {
        return [this.role_id, this.role_name];
    }
    toObject() {
        return {
            role_id: this.role_id,
            role_name: this.role_name
        };
    }
    toJson() {
        return JSON.stringify(this.toObject());
    }

    // Über die Weihnachten geschriebene wurden reinkopiert 
        // noch nicht geteste
        /////////////////////////////////////////////////////////////////////////////////
        // from's

    fromArray(array) {
        this.role_id = array[0];
        this.role_name = array[1];
    }
    fromObject(object) {
        this.role_id = object.role_id;
        this.role_name = object.role_name;
    }
    fromJson(json) {
        this.fromObject(JSON.parse(json));
    }
    fromString(string) {
        this.fromArray(string.split(','));
    }


        // Über die Weihnachten geschriebene wurden reinkopiert
        // noch nicht geteste
        /////////////////////////////////////////////////////////////////////////////////
        // Static from's
    // static fromArray(array) {
    //     return new role(array[0], array[1]);
    // }
    // static fromObject(object) {
    //     return new role(object.role_id, object.role_name);
    // }
    // static fromJson(json) {
    //     return new role(JSON.parse(json).role_id, JSON.parse(json).role_name);
    // }
    // static fromString(string) {
    //     return new role(string.split(','));
    // }


        // Über die Weihnachten geschriebene wurden reinkopiert 
        // noch nicht geteste
        // database functions
       ///////////////////////////////////////////////////////////////////////////////// 

    // static async getRole(role_id) {
    //     const sql = 'SELECT * FROM role WHERE role_id =?';
    //     const values = [role_id];
    //     try {
    //         const result = await db.pool.query(sql, values);
    //         return result[0];
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // static async getRoles() {
    //     const sql = 'SELECT * FROM role';
    //     try {
    //         const result = await db.pool.query(sql);
    //         return result;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // static async createRole(role_name) {
    //     const sql = 'INSERT INTO role (role_name) VALUES (?)';
    //     const values = [role_name];
    //     try {
    //         const result = await db.pool.query(sql, values);
    //         return result;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // static async updateRole(role_id, role_name) {

    //     const sql = 'UPDATE role SET role_name =? WHERE role_id =?';
    //     const values = [role_name, role_id];
    //     try {
    //         const result = await db.pool.query(sql, values);
    //         return result;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // static async deleteRole(role_id) {
    //     const sql = 'DELETE FROM role WHERE role_id =?';
    //     const values = [role_id];
    //     try {
    //         const result = await db.pool.query(sql, values);
    //         return result;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // static async getRoleByName(role_name) {

    //     const sql = 'SELECT * FROM role WHERE role_name =?';
    //     const values = [role_name];
    //     try {
    //         const result = await db.pool.query(sql, values);
    //         return result;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // static async getRoleById(role_id) {
    //     const sql = 'SELECT * FROM role WHERE role_id =?';
    //     const values = [role_id];
    //     try {
    //         const result = await db.pool.query(sql, values);
    //         return result;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // static async getRolesByUserId(user_id) {

    //     const sql = 'SELECT * FROM role WHERE user_id =?';
    //     const values = [user_id];
    //     try {
    //         const result = await db.pool.query(sql, values);
    //         return result;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // static async getRolesByRoleId(role_id) {

    //     const sql = 'SELECT * FROM role WHERE role_id =?';
    //     const values = [role_id];
    //     try {
    //         const result = await db.pool.query(sql, values);
    //         return result;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // war nur zum versuch vielleicht für später
    // static async getRolesByUserIdAndRoleId(user_id, role_id) {

    //     const sql = 'SELECT * FROM role WHERE user_id =? AND role_id =?';
    //     const values = [user_id, role_id];
    //     try {
    //         const result = await db.pool.query(sql, values);
    //         return result;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    
}