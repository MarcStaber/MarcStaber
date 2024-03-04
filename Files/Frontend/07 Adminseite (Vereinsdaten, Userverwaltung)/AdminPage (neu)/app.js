const bodyParser = require("body-parser");
const db = require("./db");
const express = require("express");
const path = require("path");
const multer = require('multer');
const app = express();
const port = 3000;

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images'); // Specify the destination folder for uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, 'clubImage.png'); // Set a static filename or use a unique identifier
    },
});

const upload = multer({ storage: storage });
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))


// Set the view engine to EJS
app.set('view engine', 'ejs');

const ITEMS_PER_PAGE = 15;

// Routes
app.get('/', async (req, res) => {
    let conn;
    try {
        conn = await db.pool.getConnection();
        // Fetch club settings data from the database
        const clubSettingsResult = await conn.query('SELECT * FROM club_data WHERE club_data_id = 1');
        const clubSettings = clubSettingsResult[0];

        // Fetch user data with pagination
        const currentPage = req.query.page || 1;
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;

        const results = await conn.query(
            `SELECT * FROM user LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`
        );

        // Explicitly convert COUNT(*) to a number
        const totalUsers = Number((await conn.query('SELECT COUNT(*) as count FROM user'))[0].count);
        const totalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);


        res.render('index', { users: results, clubSettings, totalPages, currentPage });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    } finally {
        if (conn) conn.end();
    }
});

app.get('/add', (req, res) => {
    // Pass a default null value for errorMessage
    res.render('add', { errorMessage: null });
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

app.post('/add', async (req, res) => {
    const newUser = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email_address,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
        phoneNumber: req.body.telephone_number,
        street: req.street,
        houseNumber: req.body.house_number,
        zipCode: req.body.zip_code,
        town: req.body.town,
        country: req.body.country,
        // Add other fields as needed
    };

    // Check if password and confirm_password are not empty
    if (!newUser.password || !newUser.confirm_password) {
        const errorMessage = 'Password and Confirm Password are required.';
        return res.render('add', { errorMessage, newUser });
    }

    // Check if password and confirm_password match
    if (newUser.password !== newUser.confirm_password) {
        const errorMessage = 'Password and Confirm Password do not match.';
        return res.render('add', { errorMessage, newUser });
    }

    const sql = `
      INSERT INTO user 
      (first_name, last_name, email_address, password, telephone_number, street, house_number, zip_code, town, country)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        newUser.firstName,
        newUser.lastName,
        newUser.email,
        newUser.password,
        newUser.phoneNumber,
        newUser.street,
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

app.get('/clubsettings', async (req, res) => {
    let conn;
    try {
        conn = await db.pool.getConnection();

        /// Fetch club settings data from the database using the appropriate column for filtering
        const result = await conn.query('SELECT * FROM club_data WHERE club_data_id = 1');
        const clubSettings = result[0];

        // Render the 'clubsettings' view and pass the data
        res.render('clubsettings', { clubSettings, errorMessage: '' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
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
        street: req.street,
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
        street = ?,
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
        updatedUser.street,
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

app.post('/saveclubsettings', upload.single('clubImage'), async (req, res) => {
    const { clubMainTitle, clubParagraph1Title, clubAddress, clubEmail, clubPhoneNumber, clubCourts } = req.body;

    // Check if required fields are empty or null
    if (!clubMainTitle || !clubAddress || !clubEmail || !clubPhoneNumber || !clubCourts) {
        const errorMessage = 'All fields must be filled out';
        
        // Fetch club settings data from the database using the appropriate column for filtering
        const result = await db.pool.query('SELECT * FROM club_data WHERE club_data_id = 1');
        const clubSettings = result[0];

        // Render the 'clubsettings' view and pass the data along with the error message
        return res.render('clubsettings', { clubSettings, errorMessage });
    }

    let conn;
    try {
        conn = await db.pool.getConnection();

        // Update the club settings data in the database
        await conn.query(
            'UPDATE club_data SET club_main_title_type = ?, club_paragraph1_title_type = ?, club_address = ?, club_email = ?, club_phonenumber = ?, club_courts = ? WHERE club_data_id = 1',
            [clubMainTitle, clubParagraph1Title, clubAddress, clubEmail, clubPhoneNumber, clubCourts ]
        );

        // Handle the uploaded image (store path, etc.) - Modify this part based on your needs

        // Redirect to the club settings page after saving
        res.redirect('/clubsettings');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    } finally {
        if (conn) conn.end();
    }
});

// Server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});