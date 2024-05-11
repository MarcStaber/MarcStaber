require('dotenv').config();
"use strict";

const Court = require("./models/Court");
const Reservation_type = require("./models/Reservation_type");
const Court_reservation = require("./models/Court_reservation");

const bodyParser = require('body-parser');




const express = require('express');
var cookieParser = require('cookie-parser');
var path = require('path');
var cors = require("cors");
const { query } = require('express-validator');
const db = require('./db');
var session = require('express-session');
const multer = require('multer');
const { NOTFOUND } = require('dns');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/'); // Specify the destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, 'Logo.png'); // Set a static filename or use a unique identifier
  },
});

const upload = multer({ storage: storage });


const app = express();
app.use('/static', express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Middleware
app.use(express.json());    // parse json bodies in the request object
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOpts = {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOpts));

// Session prüfer middleware
const requireAuth = (req, res, next) => {

  console.log(req.session.id);
  if (req.session.user_id) {
    next(); // User is authenticated, continue to next middleware
  } else {
    res.redirect('/login'); // User is not authenticated, redirect to login page
  }
}





////////////////////////////////////////////////////////////////////////////
//                             R O U T E S
////////////////////////////////////////////////////////////////////////////
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/court", require("./routes/courtRoutes"));
app.use("/api/role", require("./routes/roleRoutes"));
app.use("/api/reservation_type", require("./routes/reservationTypeRoutes"));
app.use("/api/court_reservation", require("./routes/courtReservationRoutes"));
app.use("/api/club_data", require("./routes/clubDataRoutes"));
app.use("/api/address_lookup", require("./routes/addressLookupRoutes"));
app.use("/api/register", require("./routes/userRoutes"));
app.use("/api/login", require("./routes/userRoutes"));




////////////////////////////////////////////////////////////////////////////
//                             V I E W S 
////////////////////////////////////////////////////////////////////////////

// set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/css', express.static(path.join(__dirname, 'views')));
app.use('/public', express.static(path.join(__dirname, 'public')));
////////////////////////////////////////////////////////////////////////////
//                            Kontrollpage
////////////////////////////////////////////////////////////////////////////
app.get('/controlpage', function (req, res) {

  Court.findAll().then(court_list => {
    res.render('pages/index', {
      courts: court_list
    });
  });


});
////////////////////////////////////////////////////////////////////////////
//                             I N D E X 
////////////////////////////////////////////////////////////////////////////
// TEST ONLY: index page

app.get('/', function (req, res) {

  Court.findAll().then(court_list => {
    res.render('pages/login', {
      courts: court_list
    });
  });


});

////////////////////////////////////////////////////////////////////////////
//                             A B O U T 
////////////////////////////////////////////////////////////////////////////
// TEST ONLY: about page (TEST)
// Fehlt Seite
app.get('/about', function (req, res) {
  res.render('pages/about');
});


////////////////////////////////////////////////////////////////////////////
//                             A D M I N (Authentification) 
////////////////////////////////////////////////////////////////////////////

function checkAdminAccess(req, res, next) {
  const roleId = req.session.role_id;
  const isLoggedIn = req.session.logged_in;

  // Check if user is logged in
  if (!isLoggedIn) {
    return res.redirect('/login'); // Redirect to login if not logged in
  }

  // Allow admin access only
  if (roleId === 1) {
    return next(); // Proceed to the next middleware or route handler
  } else if (roleId === 3) {
    // Redirect non-admin users to their respective page
    const userId = req.session.user_id;
    return res.redirect(`/user/${userId}/main`);
  } else {
    return res.status(403).send('Access denied: Admins only'); // Access forbidden for others
  }
}



////////////////////////////////////////////////////////////////////////////
//               ADMINPAGE confirmation button (delete)
////////////////////////////////////////////////////////////////////////////

app.get('/deleteconfirm/:user_id', function (req, res) {
  const userId = req.params.user_id;
  res.render('deleteconfirm', { userId: userId });
});

app.post('/deleteconfirm/:user_id', async function (req, res) {
  const userId = req.params.user_id;
  const confirmation = req.body.confirmation;

  if (confirmation === 'yes') {
    let conn;
    try {
      conn = await db.pool.getConnection();
      await conn.query('DELETE FROM user WHERE user_id = ?', [userId]);
      res.send('User deleted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while deleting the user');
    } finally {
      if (conn) conn.end();
    }
  } else {
    res.redirect('/adminpage');
  }
});

////////////////////////////////////////////////////////////////////////////
//                             A D M I N P A G E 
////////////////////////////////////////////////////////////////////////////
app.get('/adminpage', checkAdminAccess, async function (req, res) {

  const roleNames = {
    1: 'Admin',
    2: 'Platzwart',
    3: 'Mitglied',
    4: 'Gast',
    5: 'Neuer Benutzer'
  };



  const ITEMS_PER_PAGE = 15;
  try {
    const userId = req.session.user_id;

    const clubSettingsResult = await db.pool.query('SELECT * FROM club_data');
    const club = clubSettingsResult;

    const accountSettingsResult = await db.pool.query('SELECT * FROM user WHERE user_id = ?', [userId]);
    const account = accountSettingsResult;

    // Fetch user data with pagination
    const currentPage = req.query.page || 1;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const results = await db.pool.query(`SELECT * FROM user LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`);

    // Fetch total count of users
    const countResult = await db.pool.query('SELECT COUNT(*) as count FROM user');
    const totalUsers = Number(countResult[0].count);
    const totalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);

    res.render('pages/06 AdminHauptseite/usermanage.ejs', {
      users: results,
      club,
      totalPages,
      currentPage,
      account,
      roleNames
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

////////////////////////////////////////////////////////////////////////////
//                             Vereinsverwaltung (save data)
////////////////////////////////////////////////////////////////////////////

//uploaded picture replaces "Logo.png" in the public folder
app.post('/saveclubsettings', checkAdminAccess, upload.single('clubImage'), async (req, res) => {
  const
    { clubMainTitle, clubAddress, clubEmail, clubPhoneNumber, clubCourts, clubStreet, clubHousenumber, clubZip } = req.body;

  const clubData = [
    { id: 1, significance: 'Vereinsname', characteristic: clubMainTitle },
    { id: 2, significance: 'Postleitzahl', characteristic: clubZip },
    { id: 3, significance: 'Ort', characteristic: clubAddress },
    { id: 4, significance: 'Straße', characteristic: clubStreet },
    { id: 5, significance: 'Hausnummer', characteristic: clubHousenumber },
    { id: 6, significance: 'Telefonnummer', characteristic: clubPhoneNumber },
    { id: 7, significance: 'E-Mail', characteristic: clubEmail },
    { id: 8, significance: 'Webseite', characteristic: 'www.tc-neudauberg.at' },
    { id: 9, significance: 'max_reservierungs_minuten', characteristic: clubCourts }
  ];



  // Check if required fields are empty or null
  if (!clubMainTitle || !clubAddress || !clubEmail || !clubPhoneNumber || !clubCourts || clubStreet || clubHousenumber || clubZip) {
    const errorMessage = 'All fields must be filled out';

  }

  try {
    for (const data of clubData) {
      const query = `
          UPDATE club_data 
          SET characteristic = ?
          WHERE significance = ?;
      `;
      await db.pool.query(query, [data.characteristic, data.significance]);
    }
    console.log("All data saved successfully!");

    res.redirect('/vereinverwaltung')
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

////////////////////////////////////////////////////////////////////////////
//                             Vereinsverwaltung 
////////////////////////////////////////////////////////////////////////////
app.get('/vereinverwaltung', checkAdminAccess, async function (req, res) {
  try {
    /// Fetch club settings data from the database 
    const userId = req.session.user_id;

    const clubSettingsResult = await db.pool.query('SELECT * FROM club_data');
    const club = clubSettingsResult;

    const accountSettingsResult = await db.pool.query('SELECT * FROM user WHERE user_id = ?', [userId]);
    const account = accountSettingsResult;

    // Render the 'clubsettings' view and pass the data
    res.render('pages/06 AdminHauptseite/clubsettings.ejs', {
      club,
      errorMessage: '',
      account
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

////////////////////////////////////////////////////////////////////////////
//                             Kalender (admin)
////////////////////////////////////////////////////////////////////////////
app.get('/reservierung', checkAdminAccess, async function (req, res) {
  try {
    /// Fetch club settings data from the database
    const userId = req.session.user_id;

    const clubSettingsResult = await db.pool.query('SELECT * FROM club_data');
    const club = clubSettingsResult;

    const accountSettingsResult = await db.pool.query('SELECT * FROM user WHERE user_id = ?', [userId]);
    const account = accountSettingsResult;

    res.render('pages/06 AdminHauptseite/reservation.ejs', {

      account,
      club,
      errorMessage: '', // Example error message
      additionalError: '', // Another error message
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
////////////////////////////////////////////////////////////////////////////
//                             Benutzer hinzufügen
////////////////////////////////////////////////////////////////////////////
app.get('/add', (req, res) => {

  res.render('pages/06 AdminHauptseite/add.ejs', { errorMessage: null });
});

app.post('/add', async (req, res) => {


  const newUser = {
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email: req.body.email_address,
    password: req.body.password,
    confirm_password: req.body.confirm_password,
    phoneNumber: req.body.telephone_number,
    role_id: req.body.role_id,
    street: req.body.street,
    houseNumber: req.body.house_number,
    zipCode: req.body.zip_code,
    city: req.body.city,
    country: req.body.country,
    member_date: new Date(),

  };

  // Check if password and confirm_password are not empty
  if (!newUser.password || !newUser.confirm_password) {
    const errorMessage = 'Password and Confirm Password are required.';
    return res.render('pages/06 AdminHauptseite/add.ejs', { errorMessage, newUser });
  }

  // Check if password and confirm_password match
  if (newUser.password !== newUser.confirm_password) {
    const errorMessage = 'Password and Confirm Password do not match.';
    return res.render('pages/06 AdminHauptseite/add.ejs', { errorMessage, newUser });
  }

  const sql = `
    INSERT INTO user 
    (first_name, last_name, email_address, password, telephone_number, role_id, street, house_number, zip_code, city, country, member_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    newUser.firstName,
    newUser.lastName,
    newUser.email,
    newUser.password,
    newUser.phoneNumber,
    newUser.role_id,
    newUser.street,
    newUser.houseNumber,
    newUser.zipCode,
    newUser.city,
    newUser.country,
    newUser.member_date,

  ];

  try {
    await db.pool.query(sql, values);
    res.redirect('/adminpage');
  } catch (error) {
    console.error(error);
  }
});


////////////////////////////////////////////////////////////////////////////
//                             Benutzer bearbeiten 
////////////////////////////////////////////////////////////////////////////
app.get('/edit/:user_id', async (req, res) => {
  const userId = req.params.user_id;
  let conn;
  try {
    conn = await db.pool.getConnection();
    const result = await conn.query('SELECT * FROM user WHERE user_id = ?', [userId]);
    res.render('pages/06 AdminHauptseite/edit.ejs', { user: result[0] });
  } catch (error) {
    throw error;
  } finally {
    if (conn) conn.end();
  }
});

app.post('/edit/:user_id', async (req, res) => {
  const userId = req.params.user_id;

  // Check if the checkbox is checked to set the blocked date
  let blockedDate = null;
  if (req.body.is_blocked === 'on') {
    blockedDate = new Date().toISOString().split('T')[0]; // Get only the date portion in YYYY-MM-DD
  }

  const updatedUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_address: req.body.email_address,
    telephone_number: req.body.telephone_number,
    role_id: req.body.role_id,
    street: req.body.street,
    house_number: req.body.house_number,
    zip_code: req.body.zip_code,
    city: req.body.city,
    country: req.body.country,
    blocked_date: blockedDate, // Store the correct date
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
      city = ?,
      country = ?,
      blocked_date = ?
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
    updatedUser.city,
    updatedUser.country,
    updatedUser.blocked_date,
    userId,
  ];

  try {
    await db.pool.query(sql, values);
    res.redirect('/adminpage'); // Redirect back to the user list
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the user.");
  }
});


////////////////////////////////////////////////////////////////////////////
//                             Benutzer löschen
////////////////////////////////////////////////////////////////////////////
app.get('/delete/:user_id', async (req, res) => {
  const userId = req.params.user_id;
  res.render('pages/06 AdminHauptseite/deleteConfirm.ejs', { userId: userId });
});


app.post('/delete/:user_id', async (req, res) => {
  const userId = req.params.user_id;
  try {
    await db.pool.query('DELETE FROM user WHERE user_id = ?', [userId]);
    // Send a message back to the popout window to indicate successful deletion
    res.send('<script>window.opener.postMessage("userDeleted", "*"); window.close();</script>');
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Error deleting user");
  }
});
////////////////////////////////////////////////////////////////////////////
//                             ADD EVENT User
////////////////////////////////////////////////////////////////////////////

app.get('/event', async function (req, res) {
  try {

    res.render('pages/3.5 UserHauptseite/addEvent.ejs', { errorMessage: null });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});




////////////////////////////////////////////////////////////////////////////
//                             ADD EVENT Admin
////////////////////////////////////////////////////////////////////////////

app.get('/eventAdmin', async function (req, res) {
  try {

    res.render('pages/06 AdminHauptseite/addEvent.ejs', { errorMessage: null });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


//Funktioniert nicht!
app.post('/eventAdmin', async (req, res) => {
  try {
    const { fullName, eventTitle, eventStart, eventEnd } = req.body;

    // Placeholders
    const userId = 1;
    const courtId = 1;
    const reservationTypeId = 1;

    // Insert into the court_reservation table
    await db.query(
      'INSERT INTO court_reservation (user_id, court_id, date_time_from, date_time_to, reservation_type_id, notice) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, courtId, eventStart, eventEnd, reservationTypeId, eventTitle]
    );

    // Send a response indicating success
    res.status(200).send("Reservation successfully added");

  } catch (error) {
    console.error("Error while inserting into court_reservation:", error);
    res.status(500).json({ errorMessage: "Failed to add reservation" });
  }
});



////////////////////////////////////////////////////////////////////////////
//                             B E N U T Z E R H A U P T S E I T E 
////////////////////////////////////////////////////////////////////////////

app.get('/user/:userId/main', async function (req, res) {

  if (!req.session.logged_in || req.session.role_id !== 3) {
    return res.status(403).send('Zugriff verweigert');
  }

  try {
    const userId = req.session.user_id;

    const clubSettingsResult = await db.pool.query('SELECT * FROM club_data');
    const club = clubSettingsResult;

    const accountSettingsResult = await db.pool.query('SELECT * FROM user WHERE user_id = ?', [userId]);
    const account = accountSettingsResult;

    res.render('pages/3.5 UserHauptseite/userhauptseite.ejs', {
      account,
      club,
      errorMessage: '',
      additionalError: '',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


////////////////////////////////////////////////////////////////////////////
//                             B E N U T Z E R ACCOUNTDETAILS 
////////////////////////////////////////////////////////////////////////////


app.get('/accountdetails', async (req, res) => {
  try {
    const userId = req.session.user_id;

    const clubSettingsResult = await db.pool.query('SELECT * FROM club_data');
    const club = clubSettingsResult;

    const accountSettingsResult = await db.pool.query('SELECT * FROM user WHERE user_id = ?', [userId]);
    const account = accountSettingsResult;



    // Ensure data exists before attempting to use it
    if (accountSettingsResult.length === 0) {
      return res.status(404).send('User not found');
    }

    res.render('pages/3.5 UserHauptseite/accountdetails.ejs', {
      account: accountSettingsResult,
      club: clubSettingsResult,
      errorMessage: '',
      additionalError: '',
    });

  } catch (error) {
    console.error('Error fetching account details:', error);
    res.status(500).send('Internal Server Error');
  }
});


////////////////////////////////////////////////////////////////////////////
//                             Accountdetails (speichern) 
////////////////////////////////////////////////////////////////////////////

app.post('/saveaccountdetails/:user_id', async (req, res) => {


  try {

    const {
      firstName,
      lastName,
      userEmail,
      userPhoneNumber,
      userAddress,
      userHouseNumber,
      userZip,
      userCity,
      userPassword
    } = req.body;



    const userData = {
      first_name: firstName,
      last_name: lastName,
      email_address: userEmail,
      telephone_number: userPhoneNumber,
      street: userAddress,
      house_number: userHouseNumber,
      zip_code: userZip,
      city: userCity,
      password: userPassword,
      user_id: req.params.user_id
    };



    if (!firstName || !lastName || !userEmail || !userPhoneNumber || !userAddress || !userHouseNumber || !userZip || !userCity || !userPassword) {
      let errorMessageUser = 'Those fields cannot be empty!';
      return res.status(400).send(errorMessageUser);
    }


    try {

      const userQuery = `
        UPDATE user
        SET first_name = ?, last_name = ?, email_address = ?, telephone_number = ?,
            street = ?, house_number = ?, zip_code = ?, city = ?, password = ?
        WHERE user_id = ?;
      `;

      await db.pool.query(userQuery,
        [userData.first_name,
        userData.last_name,
        userData.email_address,
        userData.telephone_number,
        userData.street,
        userData.house_number,
        userData.zip_code,
        userData.city,
        userData.password,
        userData.user_id
        ])
        .catch(connectionError => {
          console.error("Error connecting to database:", connectionError);
          res.status(500).send("Internal Server Error (Database Connection)");
        })
        .catch(queryError => {
          console.error("Error in SQL query:", queryError);
          res.status(500).send("Internal Server Error (SQL Query)");
        });

      console.log("All data saved successfully!");
      res.redirect("/accountdetails");

    } catch (error) {
      console.error("Unexpected error saving data:", error);
      res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send("Internal Server Error");
  }
});


////////////////////////////////////////////////////////////////////////////
//                            DSGVO
////////////////////////////////////////////////////////////////////////////
app.get('/dsgvo', function (req, res) {
  res.render('pages/Datenschutz.ejs');
});




////////////////////////////////////////////////////////////////////////////
//                             IMPRESSUM
////////////////////////////////////////////////////////////////////////////
app.get('/impressum', function (req, res) {
  res.render('pages/impressum.ejs');
});

////////////////////////////////////////////////////////////////////////////
//                             PWFORGET
////////////////////////////////////////////////////////////////////////////
app.get('/forgetPW', function (req, res) {
  res.render('pages/forgetPW.ejs');
});

////////////////////////////////////////////////////////////////////////////
//                             U S E R K O N T A K T S E I T E 
////////////////////////////////////////////////////////////////////////////
app.get('/clubcontact', async function (req, res) {
  try {
    //Fetch club settings data from the database 
    const userId = req.session.user_id;

    const clubSettingsResult = await db.pool.query('SELECT * FROM club_data');
    const club = clubSettingsResult;

    const accountSettingsResult = await db.pool.query('SELECT * FROM user WHERE user_id = ?', [userId]);
    const account = accountSettingsResult;

    // Render the 'clubsettings' view and pass the data
    res.render('pages/3.5 UserHauptseite/clubcontact.ejs', {
      club,
      errorMessage: '',
      account
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  if (app.get('/edit/:logout'))
    conn.end();
});
app.get('/edit/:logout', async (req, res) => {
  const userId = req.params.user_id;
  let conn;
  try {
    conn = await db.pool.getConnection();
    const result = await conn.query('SELECT * FROM user WHERE user_id = ?', [userId]);
    res.render('pages/06 AdminHauptseite/edit.ejs', { user: result[0] });
  } catch (error) {
    throw error;
  } finally {
    if (conn) conn.end();
  }
});

////////////////////////////////////////////////////////////////////////////
//                             R E G I S T E R 
////////////////////////////////////////////////////////////////////////////
// TODO: register page 
app.get('/register', function (req, res) {
  res.render('pages/register');
});


app.post('/register', bodyParser.urlencoded({ extended: false }), async (req, res, next) => {

  // Datenbankverbindung
  try {
    conn = await db.pool.getConnection();

    let email_address = req.body.email_address.trim();
    let first_name = req.body.first_name.trim();
    let last_name = req.body.last_name.trim();
    let password = req.body.password.trim();
    let password2 = req.body.password1.trim();
    let telephone_number = req.body.telephone_number.trim();
    let street = req.body.street.trim();
    let house_number = req.body.house_number.trim();
    let zip_code = req.body.zip_code.trim();
    let city = req.body.city.trim();
    let country = req.body.country.trim();

    console.log(first_name);

    if (password != password2) {
      return res.render('pages/register.ejs', { errorMessage: 'Achtung bitte das Password richtig bestätigen' });
    }

    let userdata = await conn.query(`SELECT * FROM user WHERE email_address = '${email_address}'`);

    if (userdata.length != 0) {
      if (email_address.length > 0) {
        if (userdata[0].email_address == email_address) {
          return res.render('pages/register.ejs', { errorMessage: 'Diese Email Existiert bereits' });
        }
        else if (!(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email_address))) {
          return res.render('pages/register.ejs', { errorMessage: 'Ihre Validierung passt nicht' });
        }
        else {
          return res.render('pages/register.ejs', { errorMessage: 'Irgendein anderer Fehler' });
        }
      }
    }

    console.log(1);
    if (!(/^[a-zäöüßA-ZÄÖÜ]{2,30}$/.test(first_name)) && first_name.length > 0) {
      res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Vornamen eingeben' });
      return;
    }
    console.log(2);
    if (!(/^[a-zäöüßA-ZÄÖÜ]{2,30}$/.test(last_name)) && last_name.length > 0) {
      res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Nachnamen eingeben' });
      return;
    }
    console.log(3);
    if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) && password.length > 0) {
      res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Passwort eingeben' });
      return;
    }
    console.log(4);
    if (!(/^[0-9]{2,30}$/.test(telephone_number)) && telephone_number.length > 0) {
      res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Telefonnummer eingeben' });
      return;
    }
    console.log(5);
    if (!(/^[a-zäöüßA-ZÄÖÜ]{2,30}$/.test(street)) && street.length > 0) {
      res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Straße eingeben' });
      return;
    }
    console.log(6);
    if (!(/^[0-9]{1,6}$/.test(house_number)) && house_number.length > 0) {
      res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Hausnummer eingeben' });
      return;
    }
    console.log(7);
    if (!(/^[0-9]{2,30}$/.test(zip_code)) && zip_code.length > 0) {
      res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Postleitzahl eingeben' });
      return;
    }
    console.log(8);
    if (!(/^[a-zäöüßA-ZÄÖÜ]{2,30}$/.test(city)) && city.length > 0) {
      res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Stadt eingeben' });
      return;
    }
    console.log(9);
    if (!(/^[a-zäöüßA-ZÄÖÜ]{2,30}$/.test(country)) && country.length > 0) {
      res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Land eingeben' });

      return;
    }

    // insert data in die Datenbank
    let lastID;
    try {
      const lastIDResult = await db.pool.query("SELECT IFNULL(MAX(user_id), 0) AS lastuserid FROM user");
      lastID = lastIDResult[0].lastuserid;
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Problem mit den Einfügen der Daten ist Aufgetreten.' });
      return; // Return early in case of an error.
    }

    function getFormattedDate() {
      var jetzt = new Date();

      var jahr = jetzt.getFullYear(); // Jahr als vierstellige Zahl
      var monat = jetzt.getMonth() + 1; // Monat als Zahl (0 = Januar, 11 = Dezember)
      var tag = jetzt.getDate(); // Tag des Monats

      // Füge eine führende Null hinzu, wenn Monat oder Tag kleiner als 10 sind
      monat = monat < 10 ? '0' + monat : monat;
      tag = tag < 10 ? '0' + tag : tag;

      return `${jahr}-${monat}-${tag}`;
    }

    console.log(getFormattedDate()); // Gibt das Datum im Format "YYYY-MM-DD" aus


    let currentDate = getFormattedDate();

    // Increment the lastID to get the new BenutzerID
    const new_user_id = lastID + 1;
    const values = [new_user_id, email_address, first_name, last_name, password, 0, null, currentDate, telephone_number, 3, street, house_number, zip_code, city, country];
    try {
      const result = await db.pool.query(
        `INSERT INTO user (\`user_id\`, \`email_address\`, \`first_name\`, \`last_name\`, \`password\`, \`count_of_false_logins\`,  \`blocked_date\`, \`member_date\`,
                                 \`telephone_number\`, \`role_id\`, \`street\`,
                                 \`house_number\`, \`zip_code\`, \`city\`, \`country\`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        values
      );
      res.render('pages/register.ejs', { successMessage: 'Gratuliere Sie haben sich erfolgreich Registriert.' });
      return;
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Daten sind nicht hinzugefügt worden.' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  } finally {
    if (conn) conn.end();
  }
});

////////////////////////////////////////////////////////////////////////////
//                             L O G I N 
////////////////////////////////////////////////////////////////////////////
// TODO: login page
app.get('/login', function (req, res) {
  res.render('pages/login');
});

app.post('/login', async function (req, res) {
  const user_email_address = req.body.email_address;
  const user_password = req.body.password;


  if (!user_email_address || !user_password) {
    return res.render('pages/login', { errorMessage: 'Please fill in all fields!' });
  }

  try {
    // Fetch user data based on the email address
    const user = await db.pool.query('SELECT * FROM user WHERE email_address = ?', [user_email_address]);


    console.log(user);
    console.log(user[0].blocked_date);

    if (user[0].blocked_date !== null) {
      console.log(`User ${user_email_address} is blocked. Blocked date: ${user.blocked_date}`);
      return res.render('pages/login', { errorMessage: 'Your account is blocked. Please contact support.' });
    }

    if (user.length === 1 && user[0].password === user_password) {
      // Set session variables
      req.session.user_id = user[0].user_id;
      req.session.role_id = user[0].role_id;
      req.session.logged_in = true;

      // Redirect based on role
      if (user[0].role_id === 1) {
        return res.redirect('/adminpage'); // Redirect to admin page
      } else if (user[0].role_id === 3) {
        return res.redirect(`/user/${user[0].user_id}/main`); // Redirect to user-specific page
      } else {
        return res.status(403).send('Access denied: Invalid role');
      }
    } else {
      return res.render('pages/login', { errorMessage: 'Incorrect email address or password' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});


app.get('/logout', function (req, res) {

  req.session.destroy(function (err) {
    if (err) {
      console.error('Error during session destruction:', err);
      return res.status(500).send('An error occurred during logout');
    }
    res.redirect('/login'); // Redirect to home page after logout
  });
});
////////////////////////////////////////////////////////////////////////////
//                             U S E R 
////////////////////////////////////////////////////////////////////////////
// TODO: user page
app.get('/user/:userid', requireAuth, function (req, res) {
  // nicht nötig ihm login sondern nachher beim routing.

  if (req.session.role_id === 3)
    res.render('pages/user');
  else if (req.session.role_id === 1)
    res.render('pages/06 AdminHauptseite/reservation.ejs')
  else {
    res.render('pages/user');
  };
});

////////////////////////////////////////////////////////////////////////////
//                             User
////////////////////////////////////////////////////////////////////////////
// TODO: role page
app.get('/user', function (req, res) {
  res.render('pages/user');
});
////////////////////////////////////////////////////////////////////////////
//                             C O U R T 
////////////////////////////////////////////////////////////////////////////
// TODO: court page
app.get('/court', function (req, res) {
  res.render('pages/court');
});

////////////////////////////////////////////////////////////////////////////
//                             C O U R T  R E S E R V A T I O N
////////////////////////////////////////////////////////////////////////////
// TODO: court_reservation page
app.get('/court_reservation', function (req, res) {
  //
  Court_reservation.findAll().then(reservation_list => {
    res.render('pages/court_reservation', {
      Reservation_type: reservation_list
    });
  });
});

////////////////////////////////////////////////////////////////////////////
//                             R E S E R V A T I O N
////////////////////////////////////////////////////////////////////////////
// TODO: reservation types page
app.get('/reservation_type', function (req, res) {
  //
  Reservation_type.findAll().then(reservation_list => {
    res.render('pages/reservation_type', {
      Reservation_type: reservation_list
    });
  });
});



// Globale Fehlerbehandlung
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: err.message
  });
});

// Listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

