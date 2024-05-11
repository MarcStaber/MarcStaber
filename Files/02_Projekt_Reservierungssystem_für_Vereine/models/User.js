class User {
    constructor(
        user_id, email_address, first_name, last_name, password,
        count_of_false_logins, blocked_date, member_date, telephone_number, role_id,
        street, house_number, zip_code, city, country) {
        this.user_id = user_id;
        this.email_address = email_address;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;

        this.count_of_false_logins = count_of_false_logins;
        this.user_id = blocked_date;
        this.blocked_date = blocked_date;
        this.member_date = member_date;
        this.telephone_number = telephone_number;
        this.role_id = role_id;

        this.street = street;
        this.house_number = house_number;
        this.zip_code = zip_code;
        this.city = city;
        this.country = country;
    };

    /////////////////////////////////////////////////////////////////////////////////
    // getter und setter
    /////////////////////////////////////////////////////////////////////////////////

    getUser_id() {
        return this.user_id;
    };
    setUser_id(user_id) {
        this.user_id = user_id;
    };
    getEmail_address() {
        return this.email_address;
    };
    setEmail_address(email_address) {
        this.email_address = email_address;
    };
    getFirst_name() {
        return this.first_name;
    };
    setFirst_name(first_name) {
        this.first_name = first_name;
    };
    getLast_name() {
        return this.last_name;
    };
    setLast_name(last_name) {
        this.last_name = last_name;
    };
    getPassword() {
        return this.password;
    };

    setPassword(password) {
        this.password = password;
    };
    getCount_of_false_logins() {
        return this.count_of_false_logins;
    };
    setCount_of_false_logins(count_of_false_logins) {
        this.count_of_false_logins = count_of_false_logins;
    };
    getUser_id() {
        return this.user_id;
    };
    setUser_id(user_id) {
        this.user_id = user_id;
    };
    getBlocked_date() {
        return this.blocked_date;
    };

    setBlocked_date(blocked_date) {
        this.blocked_date = blocked_date;
    };
    getMember_date() {
        return this.member_date;
    };
    setMember_date(member_date) {
        this.member_date = member_date;
    };
    getTelephone_number() {
        return this.telephone_number;
    };
    setTelephone_number(telephone_number) {
        this.telephone_number = telephone_number;
    };
    getRole_id() {
        return this.role_id;
    };
    setRole_id(role_id) {
        this.role_id = role_id;
    };
    getStreet() {
        return this.street;
    };
    setStreet(street) {
        this.street = street;
    };
    getHouse_number() {
        return this.house_number;
    };
    setHouse_number(house_number) {
        this.house_number = house_number;
    };
    getZip_code() {
        return this.zip_code;
    };

    setZip_code(zip_code) {
        this.zip_code = zip_code;
    };
    getCity() {
        return this.city;
    };
    setCity(city) {
        this.city = city;
    };
    getCountry() {
        return this.country;
    };
    setCountry(country) {
        this.country = country;
    };


    /////////////////////////////////////////////////////////////////////////////////
    // to's
    /////////////////////////////////////////////////////////////////////////////////

    toString() {
        return `
                user_id: ${this.user_id},
                email_address: ${this.email_address},
                first_name: ${this.first_name},
                last_name: ${this.last_name},
                password: ${this.password},
                count_of_false_logins: ${this.count_of_false_logins},
                blocked_date: ${this.blocked_date},
                member_date: ${this.member_date},
                telephone_number: ${this.telephone_number},
                role_id: ${this.role_id},
                street: ${this.street},
                house_number: ${this.house_number},
                zip_code: ${this.zip_code},
                city: ${this.city},
                country: ${this.country}
            `;
    };

    toArray() {
        return [
            this.user_id,
            this.email_address,
            this.first_name,
            this.last_name,
            this.password,
            this.count_of_false_logins,
            this.blocked_date,
            this.member_date,
            this.telephone_number,
            this.role_id,
            this.street,
            this.house_number,
            this.zip_code,
            this.city,
            this.country
        ];
    };
    toObject() {
        return {
            user_id: this.user_id,
            email_address: this.email_address,
            first_name: this.first_name,
            last_name: this.last_name,
            password: this.password,
            count_of_false_logins: this.count_of_false_logins,
            blocked_date: this.blocked_date,
            member_date: this.member_date,
            telephone_number: this.telephone_number,
            role_id: this.role_id,
            street: this.street,
            house_number: this.house_number,
            zip_code: this.zip_code,
            city: this.city,
            country: this.country
        };
    };
    toJSON() {
        return {
            user_id: this.user_id,
            email_address: this.email_address,
            first_name: this.first_name,
            last_name: this.last_name,
            password: this.password,
            count_of_false_logins: this.count_of_false_logins,
            blocked_date: this.blocked_date,
            member_date: this.member_date,
            telephone_number: this.telephone_number,
            role_id: this.role_id,
            street: this.street,
            house_number: this.house_number,
            zip_code: this.zip_code,
            city: this.city,
            country: this.country
        };
    };


    /////////////////////////////////////////////////////////////////////////////////
    // from's
    /////////////////////////////////////////////////////////////////////////////////

    fromArray(arr) {
        return new User(
            arr[0],
            arr[1],
            arr[2],
            arr[3],
            arr[4],
            arr[5],
            arr[6],
            arr[7],
            arr[8],
            arr[9],
            arr[10],
            arr[11],
            arr[12],
            arr[13],
            arr[14],
            arr[15]
        );
    };
    fromObject(obj) {
        return new User(
            obj.user_id,
            obj.email_address,
            obj.first_name,
            obj.last_name,
            obj.password,
            obj.count_of_false_logins,
            obj.blocked_date,
            obj.member_date,
            obj.telephone_number,
            obj.role_id,
            obj.street,
            obj.house_number,
            obj.zip_code,
            obj.city,
            obj.country
        );
    };
    fromJSON(json) {
        return new User(
            json.user_id,
            json.email_address,
            json.first_name,
            json.last_name,
            json.password,
            json.count_of_false_logins,
            json.blocked_date,
            json.member_date,
            json.telephone_number,
            json.role_id,
            json.street,
            json.house_number,
            json.zip_code,
            json.city,
            json.country
        );
    };

    /////////////////////////////////////////////////////////////////////////////////
    // Static from's
    /////////////////////////////////////////////////////////////////////////////////

    static fromArray(arr) {
        return new User(
            arr[0],
            arr[1],
            arr[2],
            arr[3],
            arr[4],
            arr[5],
            arr[6],
            arr[7],
            arr[8],
            arr[9],
            arr[10],
            arr[11],
            arr[12],
            arr[13],
            arr[14],
            arr[15]
        );
    };
    static fromObject(obj) {
        return new User(
            obj.user_id,
            obj.email_address,
            obj.first_name,
            obj.last_name,
            obj.password,
            obj.count_of_false_logins,
            obj.blocked_date,
            obj.member_date,
            obj.telephone_number,
            obj.role_id,
            obj.street,
            obj.house_number,
            obj.zip_code,
            obj.city,
            obj.country
        );
    };
    static fromJSON(json) {
        return new User(
            json.user_id,
            json.email_address,
            json.first_name,
            json.last_name,
            json.password,
            json.count_of_false_logins,
            json.blocked_date,
            json.member_date,
            json.telephone_number,
            json.role_id,
            json.street,
            json.house_number,
            json.zip_code,
            json.city,
            json.country
        );
    };
}