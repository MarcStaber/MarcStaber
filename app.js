const bodyParser = require('body-parser');
const db = require('./db');
const express = require('express');
const path = require("path");
const { query } = require('express-validator');

//const app = express();
//const port = 3000;

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false }));

// GET
// ROOT of your Web app page
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'./public/register-user.html'));
});

// GET
// Call all benutzer in your DB
app.get('/benutzer', async (req, res) => {
    try {
        const result = await db.pool.query("select * from benutzer");
        res.send(result);
    } catch (err) {
        throw err;
    }
});

// POST
// INSERT a new benutzer from your form data HTML

app.post('/register', bodyParser.urlencoded({ extended: false }), async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;

    // Validate form data
    if (firstName === '' || lastName === '' || email === '' || password === '' || phoneNumber === '') {
        res.status(400).send('Please fill in all fields');
        return; // Return early if validation fails.
    }

    let lastID;
    try {
        const lastIDResult = await db.pool.query("SELECT IFNULL(MAX(BenutzerID), 0) AS LastBenutzerID FROM benutzer");
        lastID = lastIDResult[0].LastBenutzerID;
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while inserting data.' });
        return; // Return early in case of an error.
    }

    // Increment the lastID to get the new BenutzerID
    const newBenutzerID = lastID + 1;

    const values = [newBenutzerID, email, firstName, lastName, null, password, 6, null, 1, phoneNumber];

    try {
        const result = await db.pool.query(
            'INSERT INTO benutzer (`BenutzerID`, `Mailadresse`, `Vorname`, `Nachname`, `AdressID`, `Passwort`, ' +
            ' `anzahlFalschmeldungen`, `Gesperrtdatum`, `Mitglied`, `Telefonnummer`) ' +
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            values
        );

        res.json({ message: 'Row inserted successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while inserting data.' });
    }
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});
