const bodyParser = require("body-parser");
const db = require("./db");
const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
    let conn;
    try {
        conn = await db.pool.getConnection();
        const results = await conn.query('SELECT * FROM user');
        res.render('index', { users: results });
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', async (req, res) => {
    const newUser = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email_address,
        password: req.body.password,
        phoneNumber: req.body.telephone_number,
        houseNumber: req.body.house_number,
        zipCode: req.body.zip_code,
        town: req.body.town,
        country: req.body.country,
        // Add other fields as needed
    };

    const sql = `
      INSERT INTO user 
      (first_name, last_name, email_address, password, telephone_number, house_number, zip_code, town, country)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        newUser.firstName,
        newUser.lastName,
        newUser.email,
        newUser.password,
        newUser.phoneNumber,
        newUser.houseNumber,
        newUser.zipCode,
        newUser.town,
        newUser.country,
        // Add other values as needed
    ];

    try {
        await db.pool.query(sql, values);
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});

app.get('/edit/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    let conn;
    try {
        conn = await db.pool.getConnection();
        const result = await conn.query('SELECT * FROM user WHERE user_id = ?', [userId]);
        res.render('edit', { user: result[0] });
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
});

app.post('/edit/:user_id', async (req, res) => {
    const userId = req.params.user_id;

    // Flatten the object before updating
    const updatedUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_address: req.body.email_address,
        telephone_number: req.body.telephone_number,
        role_id: req.body.role_id,
        house_number: req.body.house_number,
        zip_code: req.body.zip_code,
        town: req.body.town,
        country: req.body.country,
        // Add other fields as needed
    };

    const sql = `
      UPDATE user
      SET 
        first_name = ?,
        last_name = ?,
        email_address = ?,
        telephone_number = ?,
        role_id = ?,
        house_number = ?,
        zip_code = ?,
        town = ?,
        country = ?
      WHERE user_id = ?
    `;

    const values = [
        updatedUser.first_name,
        updatedUser.last_name,
        updatedUser.email_address,
        updatedUser.telephone_number,
        updatedUser.role_id,
        updatedUser.house_number,
        updatedUser.zip_code,
        updatedUser.town,
        updatedUser.country,
        userId
    ];

    try {
        await db.pool.query(sql, values);
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});

app.get('/delete/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    let conn;
    try {
        conn = await db.pool.getConnection();
        await conn.query('DELETE FROM user WHERE user_id = ?', [userId]);
        res.redirect('/');
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
});

// Server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});