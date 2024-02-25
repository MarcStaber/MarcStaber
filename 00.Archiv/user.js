class User {
    
    constructor(
        user_id, email_address, first_name, last_name, password, 
        count_of_false_logins, blocked_date, member_date, telephone_number, role_id, 
        street, house_number, zip_code, city, country)
    {

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
}