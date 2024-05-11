const db = require('../config/database');

class club_data {
    constructor() {
        this.club_id = 0;
        this.club_name = "";
        this.club_description = "";
        this.club_logo = "";
        this.club_website = "";
        this.club_email = "";
        this.club_phone = "";
        this.club_street = "";
        this.club_houseNr = "";
        this.club_plz = "";
        this.club_city = "";
        this.club_country = "";
    }

    /////////////////////////////////////////////////////////////////////////////////
    // getter und setter
    /////////////////////////////////////////////////////////////////////////////////
    setClub_id(club_id) {
        this.club_id = club_id;
    }
    getClub_id() {
        return this.club_id;
    }
    setClub_name(club_name) {
        this.club_name = club_name;
    }
    getClub_name() {
        return this.club_name;
    }
    setClub_description(club_description) {
        this.club_description = club_description;
    }
    getClub_description() {
        return this.club_description;
    }
    setClub_logo(club_logo) {
        this.club_logo = club_logo;
    }
    getClub_logo() {
        return this.club_logo;
    }

    setClub_website(club_website) {
        this.club_website = club_website;
    }
    getClub_website() {
        return this.club_website;
    }
    setClub_email(club_email) {
        this.club_email = club_email;
    }
    getClub_email() {
        return this.club_email;
    }
    setClub_phone(club_phone) {
        this.club_phone = club_phone;
    }
    getClub_phone() {
        return this.club_phone;
    }
    setClub_street(club_street) {
        this.club_street = club_street;
    }
    getClub_street() {
        return this.club_street;
    }
    setClub_houseNr(club_houseNr) {
        this.club_houseNr = club_houseNr;
    }
    getClub_houseNr() {
        return this.club_houseNr;
    }
    setClub_plz(club_plz) {
        this.club_plz = club_plz;
    }
    getClub_plz() {
        return this.club_plz;
    }
    setClub_city(club_city) {
        this.club_city = club_city;
    }
    getClub_city() {
        return this.club_city;
    }
    setClub_country(club_country) {
        this.club_country = club_country;
    }
    getClub_country() {
        return this.club_country;
    }

    /////////////////////////////////////////////////////////////////////////////////
    // to 's
    /////////////////////////////////////////////////////////////////////////////////

    toString() {
        return `club_id: ${this.club_id}, club_name: ${this.club_name}, club_description: ${this.club_description}, club_logo: ${this.club_logo}, club_website: ${this.club_website}, club_email: ${this.club_email}, club_phone: ${this.club_phone}, club_street: ${this.club_street}, club_houseNr: ${this.club_houseNr}, club_plz: ${this.club_plz}, club_city: ${this.club_city}, club_country: ${this.club_country}`;
    }
    toArray() {
        return [this.club_id, this.club_name, this.club_description, this.club_logo, this.club_website, this.club_email, this.club_phone, this.club_street, this.club_houseNr, this.club_plz, this.club_city, this.club_country];
    }
    toObject() {
        return {
            club_id: this.club_id,
            club_name: this.club_name,
            club_description: this.club_description,
            club_logo: this.club_logo,
            club_website: this.club_website,
            club_email: this.club_email,
            club_phone: this.club_phone,
            club_street: this.club_street,
            club_houseNr: this.club_houseNr,
            club_plz: this.club_plz,
            club_city: this.club_city,
            club_country: this.club_country
        };
    }
    toJSON() {
        return JSON.stringify(this);
    }

    /////////////////////////////////////////////////////////////////////////////////
    // from 's
    /////////////////////////////////////////////////////////////////////////////////

    fromArray(array) {
        this.club_id = array[0];
        this.club_name = array[1];
        this.club_description = array[2];
        this.club_logo = array[3];
        this.club_website = array[4];
        this.club_email = array[5];
        this.club_phone = array[6];
        this.club_street = array[7];
        this.club_houseNr = array[8];
        this.club_plz = array[9];
        this.club_city = array[10];
        this.club_country = array[11];
    }
    fromObject(object) {
        this.club_id = object.club_id;
        this.club_name = object.club_name;
        this.club_description = object.club_description;
        this.club_logo = object.club_logo;
        this.club_website = object.club_website;
        this.club_email = object.club_email;
        this.club_phone = object.club_phone;
        this.club_street = object.club_street;
        this.club_houseNr = object.club_houseNr;
        this.club_plz = object.club_plz;
        this.club_city = object.club_city;
        this.club_country = object.club_country;
    }
    fromJSON(json) {
        this.club_id = json.club_id;
        this.club_name = json.club_name;
        this.club_description = json.club_description;
        this.club_logo = json.club_logo;
        this.club_website = json.club_website;
        this.club_email = json.club_email;
        this.club_phone = json.club_phone;
        this.club_street = json.club_street;
        this.club_houseNr = json.club_houseNr;
        this.club_plz = json.club_plz;
        this.club_city = json.club_city;
        this.club_country = json.club_country;
    }
    fromString(string) {
        this.club_id = string.club_id;
        this.club_name = string.club_name;
        this.club_description = string.club_description;
        this.club_logo = string.club_logo;
        this.club_website = string.club_website;
        this.club_email = string.club_email;
        this.club_phone = string.club_phone;
        this.club_street = string.club_street;
        this.club_houseNr = string.club_houseNr;
        this.club_plz = string.club_plz;
        this.club_city = string.club_city;
        this.club_country = string.club_country;
    }

    /////////////////////////////////////////////////////////////////////////////////
    // static 's
    /////////////////////////////////////////////////////////////////////////////////

    static async findAll() {
        let array = [];
        try {
            let query = "SELECT * FROM club_data";
            const result = await db.pool.query(query);
            return result;
        } catch (error) {
            console.log(error);
            next(error);
        }
        return array;
    }
    
}

module.exports = club_data;