class court {
    constructor(court) {
        this.court = court;
    }

    /////////////////////////////////////////////////////////////////////////////////
    // getter und setter
    // über die Weihnachten geschriebene wurden reinkopiert 
    // nicht geteste
    /////////////////////////////////////////////////////////////////////////////////
    get court_id() {
        return this._court_id;
    }
    set court_id(court_id) {
        this._court_id = court_id;
    }
    get court() {
        return this._court;
    }
    set court(court) {
        this._court = court;
    }

    /////////////////////////////////////////////////////////////////////////////////
    // to 's
    // über die Weihnachten geschriebene wurden reinkopiert 
    // nicht geteste
    /////////////////////////////////////////////////////////////////////////////////

    toString() {
        return this.court;
    }
    toArray() {
        return [this.court_id, this.court];
    }
    toObject() {
        return {
            court_id: this.court_id,
            court: this.court
        };
    }
    toJson() {
        return JSON.stringify(this.toObject());
    }


    /////////////////////////////////////////////////////////////////////////////////
    // from 's
    // über die Weihnachten geschriebene wurden reinkopiert 
    // nicht geteste
    /////////////////////////////////////////////////////////////////////////////////
    fromJson(json) {
        return new court(JSON.parse(json));
    }
    fromArray(array) {
        return new court(array);
    }
    fromObject(object) {
        return new court(object);
    }
    fromString(string) {
        return new court(string);
    }

    /////////////////////////////////////////////////////////////////////////////////
    // static 's
    // über die Weihnachten geschriebene wurden reinkopiert 
    // nicht geteste
    /////////////////////////////////////////////////////////////////////////////////

    // static fromJson(json) {
    //     return new court(JSON.parse(json));
    // }
    // static fromArray(array) {
    //     return new court(array);
    // }

    // static fromObject(object) {
    //     return new court(object);
    // }
    // static fromString(string) {
    //     return new court(string);
    // }

    /////////////////////////////////////////////////////////////////////////////////
    // Funktionen
    // über die Weihnachten geschriebene wurden reinkopiert 
    // nicht geteste
    /////////////////////////////////////////////////////////////////////////////////

    async updateCourt(court) {
        try {
            const id = court.court_id;
            const court = maskStringValue(court.court);
            let query = `
                UPDATE court 
                SET court = ${court}
                WHERE court_id = ${id};
            `;
            await db.pool.query(query);
            let newCourt = {
                court_id: id,
                court: req.body.court
            };
            res.status(200).json(newCourt);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async deleteCourt(id) {
        try {
            let query = `
                DELETE FROM court 
                WHERE court_id = ${id};
            `;
            await db.pool.query(query);
            res.status(200).send(`Court ${id} deleted`);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async createCourt(court) {
        try {
            const court = maskStringValue(court.court);
            let query = `
                INSERT INTO court (court) 
                VALUES (${court});
            `;
            await db.pool.query(query);
            let newCourt = {
                court_id: (await db.pool.query(`SELECT LAST_INSERT_ID() AS id`))[0].id,
                court: req.body.court
            };
            res.status(200).json(newCourt);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getCourtById(id) {
        try {
            let query = `
                SELECT * FROM court WHERE court_id = ${id};
            `;
            const result = await db.pool.query(query);
            res.status(200).json(result);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async getAllCourts() {
        try {
            let query = `
                SELECT * FROM court;
            `;
            const result = await db.pool.query(query);
            res.status(200).json(result);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
}