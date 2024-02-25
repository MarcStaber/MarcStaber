
// Achtung war über die Weihnachten mit User zusammen wurde dann,
// Jeweils eine Extra Tabelle erstellt 
// Falls was Fehlt

class address_lookup {
    constructor(street, house_number, zip_code, city, country) {

        this.street = street;
        this.house_number = house_number;
        this.zip_code = zip_code;
        this.city = city;
        this.country = country;
    }

    /////////////////////////////////////////////////////////////////////////////////
    // getter und setter
    // am 25.2.2024 geschrieben
    // nicht geteste
    /////////////////////////////////////////////////////////////////////////////////
    getStreet() {
        return this.street;
    }
    getHouseNumber() {
        return this.house_number;
    }
    getZipCode() {
        return this.zip_code;
    }
    getCity() {
        return this.city;
    }
    getCountry() {
        return this.country;
    }
    setStreet(street) {
        this.street = street;
    }
    setHouseNumber(house_number) {
        this.house_number = house_number;
    }
    setZipCode(zip_code) {
        this.zip_code = zip_code;
    }
    setCity(city) {
        this.city = city;
    }
    setCountry(country) {
        this.country = country;
    }


    /////////////////////////////////////////////////////////////////////////////////
    // to 's
    // am 25.2.2024 geschrieben 
    // nicht geteste
    /////////////////////////////////////////////////////////////////////////////////
    toString() {
        return this.street + " " + this.house_number + " " + this.zip_code + " " + this.city + " " + this.country;
    }
    toArray() {
        return [this.street, this.house_number, this.zip_code, this.city, this.country];
    }
    toJSON() {
        return {
            street: this.street,
            house_number: this.house_number,
            zip_code: this.zip_code,
            city: this.city,
            country: this.country
        };
    }
    toObject() {
        return {
            street: this.street,
            house_number: this.house_number,
            zip_code: this.zip_code,
            city: this.city,
            country: this.country
        };
    }

    /////////////////////////////////////////////////////////////////////////////////
    // from 's
    // am 25.2.2024 geschrieben 
    // nicht geteste
    /////////////////////////////////////////////////////////////////////////////////
    fromArray(array) {
        this.street = array[0];
        this.house_number = array[1];
        this.zip_code = array[2];
        this.city = array[3];
        this.country = array[4];
    }
    fromJSON(json) {
        this.street = json.street;
        this.house_number = json.house_number;
        this.zip_code = json.zip_code;
        this.city = json.city;
        this.country = json.country;
    }
    fromObject(object) {
        this.street = object.street;
        this.house_number = object.house_number;
        this.zip_code = object.zip_code;
        this.city = object.city;
        this.country = object.country;
    }
    fromString(string) {
        this.street = string.split(" ")[0];
        this.house_number = string.split(" ")[1];
        this.zip_code = string.split(" ")[2];
        this.city = string.split(" ")[3];
        this.country = string.split(" ")[4];
    }

    /////////////////////////////////////////////////////////////////////////////////
    // static 's
    // am 25.2.2024 geschrieben
    // nicht geteste
    /////////////////////////////////////////////////////////////////////////////////
    // static fromObject(object) {
    //     return new address_lookup(object.street, object.house_number, object.zip_code, object.city, object.country);
    // }
    // static fromArray(array) {
    //     return new address_lookup(array[0], array[1], array[2], array[3], array[4]);
    // }
    // static fromJSON(json) {
    //     return new address_lookup(json.street, json.house_number, json.zip_code, json.city, json.country);
    // }
    // static fromObject(object) {
    //     return new address_lookup(object.street, object.house_number, object.zip_code, object.city, object.country);
    // }
    

    /////////////////////////////////////////////////////////////////////////////////
    // functionen
    // am 25.2.2024 geschrieben
    // nicht geteste
    ////////////////////////////////////////////////////////////////////////////////

    static async createAddress_lookup(req, res) {
        try {
            let newAddress_lookup = new address_lookup(
                req.body.street,
                req.body.house_number,
                req.body.zip_code,
                req.body.city,
                req.body.country
            );
                let query = `
                INSERT INTO address_lookup (
                    street, 
                    house_number, 
                    zip_code, 
                    city,
                    country
                    // Add other fields as needed
                    ) VALUES (
                    ${newAddress_lookup.street}, 
                    ${newAddress_lookup.house_number}, 
                    ${newAddress_lookup.zip_code}, 
                    ${newAddress_lookup.city}, 
                    ${newAddress_lookup.country}
                    // Add other fields as needed
                    )
            `;
            await db.query(query);
            await newAddress_lookup.save();
            res.status(200).json(newAddress_lookup);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async updateAddress_lookup(req, res) {
        try {
            const id = req.params.id;
            const street = maskStringValue(req.body.street);
            const house_number = maskStringValue(req.body.house_number);
            const zip_code = maskStringValue(req.body.zip_code);
            const city = maskStringValue(req.body.city);
            const country = maskStringValue(req.body.country);
            let query = `
                UPDATE address_lookup SET
                    street = ${street}, 
                    house_number = ${house_number}, 
                    zip_code = ${zip_code},
                    city = ${city}, 
                    country = ${country}
                    // Add other fields as needed
                    WHERE id = ${id}
            `;  
            await db.query(query);
            res.status(200).json(`Address_lookup ${id} updated`);
            
        } catch (error) {
            console.log(error);
            next(error);
        } finally
        {
            await db.end();
        }
    }
    static async deleteAddress_lookup(req, res) {
        try {
            const id = req.params.id;
            let query = `
                DELETE FROM address_lookup WHERE id = ${id}
            `;
            await db.query(query);
            res.status(200).json(`Address_lookup ${id} deleted`);
        } catch (error) {
            console.log(error);
            next(error);
        } finally
        {
            await db.end();
        }
    }
    static async getAddress_lookup(req, res) {
        try {
            const id = req.params.id;
            let query = `
                SELECT * FROM address_lookup WHERE id = ${id}
            `;
            let result = await db.query(query);
            res.status(200).json(result.rows[0]);
        } catch (error) {
            console.log(error);
            next(error);
        } finally
        {
            await db.end();
        }
    }
    static async getAllAddress_lookup(req, res) {
        try {
            let query = `
                SELECT * FROM address_lookup
            `;
            let result = await db.query(query);
            res.status(200).json(result.rows);
        } catch (error) {
            console.log(error);
            next(error);
        } finally
        {
            await db.end();
        }
    }
}