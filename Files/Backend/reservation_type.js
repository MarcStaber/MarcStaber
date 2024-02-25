class reservation_type {
    constructor(reservation_type_id, reservation_type_name) {
        this.reservation_type_id = reservation_type_id;
        this.reservation_type_name = reservation_type_name;
    }

    /////////////////////////////////////////////////////////////////////////////////
        // getter und setter

    get reservation_type_id() {
        return this._reservation_type_id;
    }
    set reservation_type_id(value) {
        this._reservation_type_id = value;
    }
    get reservation_type_name() {
        return this._reservation_type_name;
    }
    set reservation_type_name(value) {
        this._reservation_type_name = value;
    }

    // Über die Weihnachten geschriebene wurden reinkopiert 
        // noch nicht geteste
        /////////////////////////////////////////////////////////////////////////////////
        // to's
        toString() {
            return this.reservation_type_name;
        }
        toArray() {
            return [this.reservation_type_id, this.reservation_type_name];
        }
        toObject() {
            return {
                reservation_type_id: this.reservation_type_id,
                reservation_type_name: this.reservation_type_name
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
            return new reservation_type(array[0], array[1]);
        }
        fromObject(object) {
            return new reservation_type(object.reservation_type_id, object.reservation_type_name);
        }
        fromJson(json) {
            return reservation_type.fromObject(JSON.parse(json));
        }


        

        // Über die Weihnachten geschriebene wurden reinkopiert
        // noch nicht geteste
        /////////////////////////////////////////////////////////////////////////////////
        // Static from's

        // static fromArray(array) {
        //     return new reservation_type(array[0], array[1]);
        // }
        // static fromObject(object) {
        //     return new reservation_type(object.reservation_type_id, object.reservation_type_name);
        // }
        // static fromJson(json) {
        //     return reservation_type.fromObject(JSON.parse(json));
        // }

        // Über die Weihnachten geschriebene wurden reinkopiert 
        // noch nicht geteste
        // database functions
       ///////////////////////////////////////////////////////////////////////////////// 

    // static getReservationTypes() {
    //     return new Promise((resolve, reject) => {
    //         db.query('SELECT * FROM reservation_type', (err, result) => {
    //             if (err) {
    //                 reject(err);
    //             }
    //             else {
    //                 resolve(result);
    //             }
    //         });
    //     });
    // }

    // static getReservationTypeById(reservation_type_id) {
    //     return new Promise((resolve, reject) => {
    //         db.query('SELECT * FROM reservation_type WHERE reservation_type_id =?', [reservation_type_id], (err, result) => {
    //             if (err) {
    //                 reject(err);
    //             }
    //             else {
    //                 resolve(result);
    //             }
    //         });
    //     });
    // }

    // static addReservationType(reservation_type_name) {
    //     return new Promise((resolve, reject) => {
    //         db.query('INSERT INTO reservation_type (reservation_type_name) VALUES (?)', [reservation_type_name], (err, result) => {
    //             if (err) {
    //                 reject(err);
    //             }
    //             else {
    //                 resolve(result);
    //             }
    //         });
    //     });
    // }

    // static updateReservationType(reservation_type_id, reservation_type_name) {
    //     return new Promise((resolve, reject) => {
    //         db.query('UPDATE reservation_type SET reservation_type_name =? WHERE reservation_type_id =?', [reservation_type_name, reservation_type_id], (err, result) => {
    //             if (err) {
    //                 reject(err);
    //             }
    //             else {
    //                 resolve(result);
    //             }
    //         });
    //     });
    // }

    // static deleteReservationType(reservation_type_id) {
    //     return new Promise((resolve, reject) => {
    //         db.query('DELETE FROM reservation_type WHERE reservation_type_id =?', [reservation_type_id], (err, result) => {
    //             if (err) {
    //                 reject(err);
    //             }
    //             else {
    //                 resolve(result);
    //             }
    //         });
    //     });
    // }

    // static maskStringValue(val) {
    //     if (val!= null) {
    //         return new Promise((resolve, reject) => {
    //             db.query('SELECT * FROM reservation_type WHERE reservation_type_id =?', [val], (err, result) => {
    //                 if (err) {
    //                     reject(err);
    //                 }
    //                 else {
    //                     resolve(result);
    //                 }
    //             });
    //         });
    //     }
    // }
    // static maskIntValue(val) {
    //     if (val!= null) {
    //         return new Promise((resolve, reject) => {
    //             db.query('SELECT * FROM reservation_type WHERE reservation_type_id =?', [val], (err, result) => {
    //                 if (err) {
    //                     reject(err);
    //                 }
    //                 else {
    //                     resolve(result);
    //                 }
    //             });
    //         });
    //     }
    // }

    
}