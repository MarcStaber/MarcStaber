"use strict";

export class User {
    constructor ()  {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.country = country;
    this.plz = plz;
    this.city = city;
    this.street = street;
    this.houseNr = houseNr;
    }

    createUser = function() {
        if (document.getElementById("password") === document.getElementById("password2")) {
            this.firstname = document.getElementById("firstname");
            this.lastname = document.getElementById("lastname");
            this.email = document.getElementById("email");
            this.password = document.getElementById("password");
            this.country = document.getElementById("country");
            this.plz = document.getElementById("plz");
            this.city = document.getElementById("city");
            this.street = document.getElementById("street");
            this.houseNr = document.getElementById("houseNr");
            let user;
            user = new User(this.firstname,this.lastname,this.email,this.phone,this.password,this.country,this.plz,this.city, this.street, this.houseNr);
        }
        else {
            passwordRegistryFailure();
        }
    }
    getUser = function() {
        return this.user;
    }
}
