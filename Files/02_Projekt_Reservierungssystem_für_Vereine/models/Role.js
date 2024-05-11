class Role {

    /////////////////////////////////////////////////////////////////////////////////
    // private class member variables
    /////////////////////////////////////////////////////////////////////////////////
    #role_id;
    #role;

    /////////////////////////////////////////////////////////////////////////////////
    // constructor
    /////////////////////////////////////////////////////////////////////////////////
    constructor(role_id = null, role_name = "") {
        this.#role_id = role_id;
        this.#role = role_name;
    }

    /////////////////////////////////////////////////////////////////////////////////
    // getter und setter
    /////////////////////////////////////////////////////////////////////////////////
    get role_id() {
        return this.#role_id;
    }
    
    set role_id(role_id) {
        this.#role_id = role_id;
    }
    
    get role() {
        return this.#role;
    }
    
    set role(role) {
        this.#role = role;
    }

    /////////////////////////////////////////////////////////////////////////////////
    // to's
    /////////////////////////////////////////////////////////////////////////////////
    toString() {
        return `Role { role_id: "${this.#role_id}", role: "${this.#role}" }`;
    }

    toArray() {
        return [this.#role_id, this.#role];
    }

    toObject() {
        return {
            role_id: this.#role_id,
            role_name: this.#role
        };
    }

    toJson() {
        return JSON.stringify(this.toObject());
    }

    /////////////////////////////////////////////////////////////////////////////////
    // static from's
    /////////////////////////////////////////////////////////////////////////////////
    static fromArray(array) {
        return new Role(array[0], array[1]);
    }

    static fromObject(object) {
        return new Role(object.role_id, object.role);
    }

    static fromJson(json) {
        const obj = JSON.parse(json);
        return new Role(obj.role_id, obj.role);
    }
}