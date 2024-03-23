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

        // Über die Weihnachten geschriebene wurden reinkopiert 
        // noch nicht geteste
        /////////////////////////////////////////////////////////////////////////////////
        // to's
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

        // Über die Weihnachten geschriebene wurden reinkopiert 
        // noch nicht geteste
        /////////////////////////////////////////////////////////////////////////////////
        // from's
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
        
        // Über die Weihnachten geschriebene wurden reinkopiert
        // noch nicht geteste
        /////////////////////////////////////////////////////////////////////////////////
        // Static from's
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

        // Über die Weihnachten geschriebene wurden reinkopiert 
        // noch nicht geteste
        // database functions
       ///////////////////////////////////////////////////////////////////////////////// 
        

    // static async createUser(req, res) {
    //     const newUser = new User(
    //         req.body.user_id,
    //         req.body.email_address,
    //         req.body.first_name,
    //         req.body.last_name,
    //         req.body.password,
    //         req.body.count_of_false_logins,
    //         req.body.blocked_date,
    //         req.body.member_date,
    //         req.body.telephone_number,
    //         req.body.role_id,
    //         req.body.street,
    //         req.body.house_number,
    //         req.body.zip_code,
    //         req.body.city,
    //         req.body.country
    //     );
    //     console.log(newUser);
    //     console.log(req.body);

    //     const query = `
    //         INSERT INTO user (
    //             user_id, email_address, first_name, last_name, password, 
    //             count_of_false_logins, blocked_date, member_date, telephone_number, role_id, 
    //             street, house_number, zip_code, city, country`
    //         + `) VALUES (
    //             ${newUser.user_id}, 
    //             ${newUser.email_address}, 
    //             ${newUser.first_name}, 
    //             ${newUser.last_name},
    //             ${newUser.password},
    //             ${newUser.count_of_false_logins},
    //             ${newUser.blocked_date},
    //             ${newUser.member_date},
    //             ${newUser.telephone_number || ''},
    //             ${newUser.role_id},
    //             ${newUser.street},
    //             ${newUser.house_number},
    //             ${newUser.zip_code},
    //             ${newUser.city},
    //             ${newUser.country}  
    //              )
    //     `;
        
    
    //     try {
    //         await newUser.save();
    //         res.status(201).json(newUser);
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // };

    // static async getUserById(req, res) {
    //     try {
    //         const id = req.params.id;
    //         const query = `SELECT * FROM user WHERE user_id = ${id}`;
    //         const result = await db.pool.query(query);
    //         res.status(200).json({ result });
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // };

    // static async getUsers(req, res) {
    //     try {
    //         const query = `SELECT * FROM user`;
    //         const result = await db.pool.query(query);
    //         res.status(200).json({ result });
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // };

    // static async deleteUserById(req, res) {
    //     try {
    //         const id = req.params.id;
    //         const query = `DELETE FROM user WHERE user_id = ${id}`;
    //         await db.pool.query(query);
    //         res.status(200).send(`User ${id} deleted`);
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // };

    // static async updateUserById(req, res) {
    //     try {
    //         const id = req.params.id;
    //         const newUser = new User(
    //             req.body.user_id,
    //             req.body.email_address,
    //             req.body.first_name,
    //             req.body.last_name,
    //             req.body.password,
    //             req.body.count_of_false_logins,
    //             req.body.blocked_date,
    //             req.body.member_date,
    //             req.body.telephone_number,
    //             req.body.role_id,
    //             req.body.street,
    //             req.body.house_number,
    //             req.body.zip_code,
    //             req.body.city,
    //             req.body.country
    //         );
    //         const query = `
    //             UPDATE user
    //             SET email_address = ${newUser.email_address},
    //                 first_name = ${newUser.first_name},
    //                 last_name = ${newUser.last_name},
    //                 password = ${newUser.password},
    //                 count_of_false_logins = ${newUser.count_of_false_logins},
    //                 blocked_date = ${newUser.blocked_date},
    //                 member_date = ${newUser.member_date},
    //                 telephone_number = ${newUser.telephone_number || ''},
    //                 role_id = ${newUser.role_id},
    //                 street = ${newUser.street},
    //                 house_number = ${newUser.house_number},
    //                 zip_code = ${newUser.zip_code},
    //                 city = ${newUser.city},
    //                 country = ${newUser.country}
    //                 WHERE user_id = ${id}
    //                 `;

    //         await db.pool.query(query);

    //         res.status(200).json(`User ${id} updated`);

    //         } catch (error) {
    //             res.status(500).json(error);
            
    //             }
    // };

    // async save() {
    //     const query = `
    //         INSERT INTO user (
    //             user_id, email_address, first_name, last_name, password, 
    //             count_of_false_logins, blocked_date, member_date, telephone_number, role_id, 
    //             street, house_number, zip_code, city, country`
    //             + `) VALUES (
    //             ${this.user_id}, 
    //             ${this.email_address}, 
    //             ${this.first_name}, 
    //             ${this.last_name},
    //             ${this.password},
    //             ${this.count_of_false_logins},
    //             ${this.blocked_date},
    //             ${this.member_date},
    //             ${this.telephone_number || ''},
    //             ${this.role_id},
    //             ${this.street},
    //             ${this.house_number},
    //             ${this.zip_code},
    //             ${this.city},
    //             ${this.country}
    //                 )
    //     `;
                    
    //     try {
    //         await db.pool.query(query);
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         console.log("Saved");
    //     } 

    //     //const result = await db.pool.query(query);
    //     //console.log(result);
    // };

    // static async getUserByEmail(req, res) {
    //     try {
    //         const email = req.params.email;
    //         const query = `SELECT * FROM user WHERE email_address = ${email}`;
    //         const result = await db.pool.query(query);
    //         res.status(200).json({ result });
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // };


        // different tests
//         import { User } from './user.js';

// describe('User', () => {
//   describe('fromArray', () => {
//     it('should create a new User instance from an array', () => {
//       const user = User.fromArray([
//         '1',
//         'test@gmail.com',
//         'John',
//         'Doe',
//         'test',
//         0,
//         null,
//         null,
//         '0123456789',
//         1,
//         'test street',
//         '123',
//         '12345',
//         'Test City',
//         'Test Country'
//       ]);

//       expect(user).toEqual(
//         expect.objectContaining({
//           user_id: '1',
//           email_address: 'test@test',
//           first_name: 'John',
//           last_name: 'Doe',
//           password: 'test',
//           count_of_false_logins: 0,
//           blocked_date: null,
//           member_date: null,
//           telephone_number: '0123456789',
//           role_id: 1,
//           street: 'test street',
//           house_number: '123',
//           zip_code: '12345',
//           city: 'Test City',
//           country: 'Test Country'
//         })
//       );
//     });
//   });
// });
        


}
