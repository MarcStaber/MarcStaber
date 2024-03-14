const db = require('../config/database');

class Court {

    /////////////////////////////////////////////////////////////////////////////////
    // private class member variables
    /////////////////////////////////////////////////////////////////////////////////
    #court_id;
    #court;

    /////////////////////////////////////////////////////////////////////////////////
    // constructor
    /////////////////////////////////////////////////////////////////////////////////
    constructor(court_id, court) {
        this.#court_id = court_id;
        this.#court = court;
    }

    /////////////////////////////////////////////////////////////////////////////////
    // getter und setter
    /////////////////////////////////////////////////////////////////////////////////
    get court_id() {
        return this.#court_id;
    }

    set court_id(court_id) {
        this.#court_id = court_id;
    }

    get court() {
        return this.#court;
    }

    set court(court) {
        this.#court = court;
    }

    /////////////////////////////////////////////////////////////////////////////////
    // to 's
    /////////////////////////////////////////////////////////////////////////////////
    toString() {
        return `Court { court_id: "${this.#court_id}", court: "${this.#court}" }`;
    }

    toArray() {
        return [this.#court_id, this.#court];
    }

    toObject() {
        return {
            court_id: this.#court_id,
            court: this.#court
        };
    }

    toJson() {
        return JSON.stringify(this.toObject());
    }

    /////////////////////////////////////////////////////////////////////////////////
    // static from 's
    /////////////////////////////////////////////////////////////////////////////////
    static fromJson(json) {
        return JSON.parse(json);
    }



    /////////////////////////////////////////////////////////////////////////////////
    // DB Funktionen
    /////////////////////////////////////////////////////////////////////////////////


    async save() {
        const id = this.#court_id;
        const court = maskStringValue(this.#court);
        try {
            if (id == null) {
                let query = `
                    INSERT INTO court (court) 
                    VALUES (${court});
                `;
                const result = await db.pool.query(query);
                const new_id = Number(result.insertId);
                return new Court(new_id, this.#court);
            } else {
                let query = `
                    UPDATE court 
                    SET court = ${court}
                    WHERE court_id = ${id};
                `;
                await db.pool.query(query);
                return new Court(id, this.#court);
            }
        } catch (error) {
            console.log(error);
        }
    }
/*
    static async findAll() {
        let array = [];
        try {
            let query = `SELECT * FROM court;`;
            const result = await db.pool.query(query);
            // result is a list with only one element
            result.forEach(element => {
                console.log(element.court);
                array.push(new Court(element.court_id, element.court));
            });
        } catch (error) {
            console.log(error);
        }    
        return array;
    }
*/
    static async findAll() {
        let array = [];
        try {
            let query = `SELECT * FROM court;`;
            const result = await db.pool.query(query);
            return result;
        } catch (error) {
            console.log(error);
        }    
        return array;
    }

    static async find(id) {
        try {
            let query = `SELECT * FROM court WHERE court_id = ${id};`;
            const result = await db.pool.query(query);
            // result is a list with only one element
            return new Court(result[0].court_id, result[0].court);
        } catch (error) {
            console.log(error);
        }    
        return null;
    }

    static ret( text ) {
        return text;
    }

}

module.exports = Court;
