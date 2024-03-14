const db = require('../config/database');


class Reservation_type {

    #reservation_type_id;
    #reservation_type;
    #admin_rights;

    constructor(reservation_type_id, reservation_type, admin_rights) {
        this.#reservation_type_id = reservation_type_id;
        this.#reservation_type = reservation_type;
        this.#admin_rights = admin_rights;
    }

    /////////////////////////////////////////////////////////////////////////////////
        // getter und setter

    get reservation_type_id() {
        return this.#reservation_type_id;
    }
    set reservation_type_id(value) {
        this.#reservation_type_id = value;
    }
    get reservation_type() {
        return this.#reservation_type;
    }
    set reservation_type(value) {
        this.#reservation_type = value;
    }
    get admin_rights() {
        return this.#admin_rights;
    }
    set admin_rights(value) {
        this.#admin_rights = value;
    }

    // Über die Weihnachten geschriebene wurden reinkopiert 
        // noch nicht geteste
        /////////////////////////////////////////////////////////////////////////////////
        // to's
        toString() {
            return `Reservation_type { reservation_type_id: "${this.#reservation_type_id}", reservation_type: "${this.#reservation_type}" , admin_rights: "${this.#admin_rights}" }`;
        }
        toArray() {
            return [this.#reservation_type_id, this.#reservation_type];
        }
        toObject() {
            return {
                reservation_type_id: this.#reservation_type_id,
                reservation_type_name: this.#reservation_type
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
            return new Reservation_type(array[0], array[1]);
        }
        fromObject(object) {
            return new Reservation_type(object.reservation_type_id, object.reservation_type, object.admin_rights);
        }
        fromJson(json) {
            const obj = JSON.parse(json);
            return new Reservation_type(obj.reservation_type_id, obj.reservation_type, obj.admin_rights);
        }

        static fromJson(json) {
            return JSON.parse(json);
        }

        async save() {
            const id = this.#reservation_type_id;
            const reservation_type = maskStringValue(this.#reservation_type, this.#admin_rights);
            try {
                if (id == null) {
                    let query = `
                        INSERT INTO reservation_type (reservation_type) 
                        VALUES ("${reservation_type}")
                    `;
                    const result = await db.pool.query(query);
                const new_id = Number(result.insertId);
                return new Reservation_type(new_id, this.#reservation_type, this.#admin_rights);
                }
                else {
                    let query = `
                        UPDATE reservation_type SET reservation_type = "${reservation_type}" 
                        WHERE reservation_type_id = ${id}
                    `;
                    await db.pool.query(query);
                    return new Reservation_type(id, this.#reservation_type, this.#admin_rights);
                }
            }
            catch (err) {
                console.log(err);
            }
        }

        static async findAll() {
            let array = [];
            try {
                let query = `
                    SELECT * FROM reservation_type
                `;
                const result = await db.pool.query(query);
                return result;
            }
            catch (err) {
                console.log(err);
            }
            return array;
        }

        static async find(id) {
            try {
                let query = `
                    SELECT * FROM reservation_type WHERE reservation_type_id = ${id};`;
                    const result = await db.pool.query(query);
                    // result is a list with only one element
                    return new Reservation_type(result[0].reservation_type_id, result[0].reservation_type, result[0].admin_rights);
                } catch (error) {
                    console.log(error);
                }
                return null;
            }
}

module.exports = Reservation_type;