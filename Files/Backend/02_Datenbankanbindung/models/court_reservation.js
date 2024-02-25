class court_reservation {

    constructor(court_id, user_id) {
        this.court_id = court_id;
        this.user_id = user_id;
    }

    /////////////////////////////////////////////////////////////////////////////////
    // getter und setter
    // über die Weihnachten geschriebene wurden reinkopiert 
    // nicht geteste
    /////////////////////////////////////////////////////////////////////////////////
    
    get court_id() {
        return this._court_id;
    }
    set court_id(value) {
        this._court_id = value;
    }
    get user_id() {
        return this._user_id;
    }
    set user_id(value) {
        this._user_id = value;
    }

    /////////////////////////////////////////////////////////////////////////////////
    // to 's
    // über die Weihnachten geschriebene wurden reinkopiert 
    // nicht geteste
    /////////////////////////////////////////////////////////////////////////////////

    toString() {
        return `court_id: ${this.court_id}, user_id: ${this.user_id}`;
    }
    toArray() {
        return [this.court_id, this.user_id];
    }
    toObject() {
        return {
            court_id: this.court_id,
            user_id: this.user_id
        };
    }
    toJSON() {
        return JSON.stringify(this.toObject());
    }

    /////////////////////////////////////////////////////////////////////////////////
    // from 's
    // über die Weihnachten geschriebene wurden reinkopiert 
    // nicht geteste
    /////////////////////////////////////////////////////////////////////////////////

    fromArray(array) {
        this.court_id = array[0];
        this.user_id = array[1];
    }
    fromObject(object) {
        this.court_id = object.court_id;
        this.user_id = object.user_id;
    }
    fromJSON(json) {
        this.court_id = JSON.parse(json).court_id;
        this.user_id = JSON.parse(json).user_id;
    }
    fromString(string) {
        this.court_id = string.split(',')[0];
        this.user_id = string.split(',')[1];
    }

    /////////////////////////////////////////////////////////////////////////////////
    // static 's
    // über die Weihnachten geschriebene wurden reinkopiert 
    // nicht geteste
    /////////////////////////////////////////////////////////////////////////////////

    // static fromArray(array) {
    //     return new court_reservation(array[0], array[1]);
    // }
    // static fromObject(object) {
    //     return new court_reservation(object.court_id, object.user_id);
    // }
    // static fromJSON(json) {
    //     return new court_reservation(JSON.parse(json).court_id, JSON.parse(json).user_id);
    // }
    // static fromString(string) {
    //     return new court_reservation(string.split(',')[0], string.split(',')[1]);
    // }




    /////////////////////////////////////////////////////////////////////////////////
    // Funktionen
    // über die Weihnachten geschriebene wurden reinkopiert 
    // nicht geteste
    /////////////////////////////////////////////////////////////////////////////////

    // async createCourtReservation() {
    //     let query = `INSERT INTO court_reservation (court_id, user_id) VALUES (${this.court_id}, ${this.user_id});`;
    //     await db.pool.query(query);
    // }
    // async deleteCourtReservation() {
    //     let query = `DELETE FROM court_reservation WHERE court_id = ${this.court_id} AND user_id = ${this.user_id};`;
    //     await db.pool.query(query);
    // }
    // async getCourtReservation() {
    //     let query = `SELECT * FROM court_reservation WHERE court_id = ${this.court_id} AND user_id = ${this.user_id};`;
    //     return await db.pool.query(query);
    // }
    // async updateCourtReservation() {
    //     let query = `UPDATE court_reservation SET court_id = ${this.court_id}, user_id = ${this.user_id} WHERE court_id = ${this.court_id} AND user_id = ${this.user_id};`;
    //     await db.pool.query(query);
    // }
    // async getCourtReservationById() {
    //     let query = `SELECT * FROM court_reservation WHERE court_id = ${this.court_id} AND user_id = ${this.user_id};`;
    //     return await db.pool.query(query);
    // }

    
    // Nur versuch vielleicht für später
    // async getCourtReservationByUser() {
    //     let query = `SELECT * FROM court_reservation WHERE user_id = ${this.user_id};`;
    //     return await db.pool.query(query);
    // }
    
    // async deleteCourtReservationById() {
    //     let query = `DELETE FROM court_reservation WHERE court_id = ${this.court_id} AND user_id = ${this.user_id};`;
    //     await db.pool.query(query);
    // }
    // async deleteCourtReservationByUser() {
    //     let query = `DELETE FROM court_reservation WHERE user_id = ${this.user_id};`;
    //     await db.pool.query(query);
    // }
    
    // // ist nur zum versuch vielleicht für später
    // async getCourtReservationByUserAndCourt() {
    //     let query = `SELECT * FROM court_reservation WHERE user_id = ${this.user_id} AND court_id = ${this.court_id};`;
    //     return await db.pool.query(query);
    // }
    
}

