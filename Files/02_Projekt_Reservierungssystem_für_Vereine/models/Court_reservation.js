const db = require('../config/database');

class Court_reservation {

    #reservation_number;
    #user_id;
    #court_id;
    #date_time_from;
    #date_time_to;
    #reservation_type_id;
    #notice;
    #cancel_datetime;

    /////////////////////////////////////////////////////////////////////////////////
    // constructor
    /////////////////////////////////////////////////////////////////////////////////

    constructor(options) {
        this.#reservation_number = options.reservation_number;
        this.#user_id = options.user_id;
        this.#court_id = options.court_id;
        this.#date_time_from = options.date_time_from;
        this.#date_time_to = options.date_time_to;
        this.#reservation_type_id = options.reservation_type_id;
        this.#notice = options.notice;
        this.#cancel_datetime = options.cancel_datetime;
    }

    /////////////////////////////////////////////////////////////////////////////////
    // getter und setter
    /////////////////////////////////////////////////////////////////////////////////
    
    get reservation_number() {
        return this.#reservation_number;
    }
    set reservation_number(value) {
        this.#reservation_number = value;
    }
    get user_id() {
        return this.#user_id;
    }
    set user_id(value) {
        this.#user_id = value;
    }
    get court_id() {
        return this.#court_id;
    }
    set court_id(value) {
        this.#court_id = value;
    }
    get date_time_from() {
        return this.#date_time_from;
    }
    set date_time_from(value) {
        this.#date_time_from = value;
    }
    get date_time_to() {
        return this.#date_time_to;
    }
    set date_time_to(value) {
        this.#date_time_to = value;
    }
    get reservation_type_id() {
        return this.#reservation_type_id;
    }
    set reservation_type_id(value) {
        this.#reservation_type_id = value;
    }
    get notice() {
        return this.#notice;
    }
    set notice(value) {
        this.#notice = value;
    }
    get cancel_datetime() {
        return this.#cancel_datetime;
    }
    set cancel_datetime(value) {
        this.#cancel_datetime = value;
    }

    /////////////////////////////////////////////////////////////////////////////////
    // to 's
    /////////////////////////////////////////////////////////////////////////////////

    toString() {
        return `Court_reservation { reservation_number: "${this.#reservation_number}"
        ,user_id: "${this.#user_id}"
        , court_id: "${this.#court_id}"
        , date_time_from: "${this.#date_time_from}"
        , date_time_to: "${this.#date_time_to}"
        , reservation_type_id: "${this.#reservation_type_id}"
        , notice: "${this.#notice}"
        , cancel_datetime: "${this.#cancel_datetime}"
     }`;
    }
    toArray() {
        return [this.#reservation_number, this.#user_id, this.#court_id, this.#date_time_from, this.#date_time_to, this.#reservation_type_id, this.#notice, this.#cancel_datetime];
    }
    
    toObject() {
        return {
            reservation_number: this.#reservation_number,
            user_id: this.#user_id,
            court_id: this.#court_id,
            date_time_from: this.#date_time_from,
            date_time_to: this.#date_time_to,
            reservation_type_id: this.#reservation_type_id,
            notice: this.#notice,
            cancel_datetime: this.#cancel_datetime
        };
    }


    toJSON() {
        return JSON.stringify(this.toObject());
    }

    /////////////////////////////////////////////////////////////////////////////////
    // from 's
    /////////////////////////////////////////////////////////////////////////////////

    fromArray(array) {
        return new Court_reservation(array[0], array[1], array[2], array[3], array[4], array[5], array[6], array[7]);
    }

    fromObject(object) {
        return new Court_reservation(object.reservation_number, object.user_id, object.court_id, object.date_time_from, object.date_time_to, object.reservation_type_id, object.notice, object.cancel_datetime);
    }

    fromJson(json) {
        return new Court_reservation(JSON.parse(json).reservation_number, JSON.parse(json).user_id, JSON.parse(json).court_id, JSON.parse(json).date_time_from, JSON.parse(json).date_time_to, JSON.parse(json).reservation_type_id, JSON.parse(json).notice, JSON.parse(json).cancel_datetime);
    }

    static fromJson(json) {
        return JSON.parse(json);
    }

    /////////////////////////////////////////////////////////////////////////////////
    // methods 's
    /////////////////////////////////////////////////////////////////////////////////

    async save() {
        const id = this.#reservation_number;
        const court_reservation = maskStringValue(this.#reservation_number, this.#user_id, this.#court_id, this.#date_time_from, this.#date_time_to, this.#reservation_type_id, this.#notice, this.#cancel_datetime);
        try {
            if (id == null) {
                let query = `INSERT INTO court_reservation (reservation_number, user_id, court_id, date_time_from, date_time_to, reservation_type_id, notice, cancel_datetime) VALUES (${court_reservation}`;
                const result = await db.pool.query(query);
                const new_id = Number(result.insertId);
                return new Court_reservation(this.#reservation_number, this.#user_id, this.#court_id, this.#date_time_from, this.#date_time_to, this.#reservation_type_id, this.#notice, this.#cancel_datetime);
            } else {
                let query = `UPDATE court_reservation SET user_id = ${this.#user_id}, court_id = ${this.#court_id}, date_time_from = ${this.#date_time_from}, date_time_to = ${this.#date_time_to}, reservation_type_id = ${this.#reservation_type_id}, notice = ${this.#notice}, cancel_datetime = ${this.#cancel_datetime} WHERE reservation_number = ${this.#reservation_number};`;
                await db.pool.query(query);
                return new Court_reservation(this.#reservation_number, this.#user_id, this.#court_id, this.#date_time_from, this.#date_time_to, this.#reservation_type_id, this.#notice, this.#cancel_datetime);
            }
        } catch (error) {
            console.log(error);
        }
        return array;
    }

    static async findAll() {
        let array = [];
        try {
            let query = `SELECT * FROM court_reservation;`;
            const result = await db.pool.query(query);
            return result;
        } catch (error) {
            console.log(error);
        }
        return array;
    }

    static async find(id) {
        try {
            let query = `SELECT * FROM court_reservation WHERE reservation_number = ${id};`;
            const result = await db.pool.query(query);
            return new Court_reservation(result[0].reservation_number, result[0].user_id, result[0].court_id, result[0].date_time_from, result[0].date_time_to, result[0].reservation_type_id, result[0].notice_id, result[0].cancel_datetimes);
        } catch (error) {
            console.log(error);
        }
        return null;
    }    
}

module.exports = Court_reservation;

