require('dotenv').config();
//import validator from 'validator';
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
//const emailValidator = require('express-validator');
//const validator = require('validator');

const app = express();

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
//app.use(emailValidator());

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
  methods: ['GET','POST','DELETE'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOpts));

// Session prüfer middleware
const requireAuth = (req, res, next) => {
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

////////////////////////////////////////////////////////////////////////////
//                             I N D E X 
////////////////////////////////////////////////////////////////////////////
// TEST ONLY: index page
// Fehlt Seite
app.get('/', function(req, res) { 
  //
  Court.findAll().then( court_list => {
    res.render('pages/index', {
      courts: court_list
    });
  });
    
  
  //const json = JSON.stringify(court_list);
  //console.log( json );
/*

  for (var i = 0; i < court_list.length; i++){
    console.log( court_list[i].toString() );
  }
  */
  /*
  court_list.forEach(element => {
    console.log( element.toString() );
  });
*/
  
});

////////////////////////////////////////////////////////////////////////////
//                             A B O U T 
////////////////////////////////////////////////////////////////////////////
// TEST ONLY: about page (TEST)
// wäre aber vielleicht ganz nett. Eine Seite über euch.
// Fehlt Seite
app.get('/about', function(req, res) {
  res.render('pages/about');
});

////////////////////////////////////////////////////////////////////////////
//                             A D M I N P A G E 
////////////////////////////////////////////////////////////////////////////
app.get('/adminpage', function(req, res) {
  res.render('pages/07 Adminseite (Vereinsdaten, Userverwaltung)/AdminPage (neu)/views/index.ejs');
});

////////////////////////////////////////////////////////////////////////////
//                             B E N U T Z E R H A U P T S E I T E 
////////////////////////////////////////////////////////////////////////////
app.get('/benutzerhauptseite', function(req, res) {
  res.render('pages/03 UserHauptseite/Projekt_BenutzerHauptSeite.ejs');
});

////////////////////////////////////////////////////////////////////////////
//                             U S E R A C C O U N T 
////////////////////////////////////////////////////////////////////////////
app.get('/useraccount', function(req, res) {
  res.render('pages/04 UserAccountSeite/Projekt_UserAccount.ejs');
});

////////////////////////////////////////////////////////////////////////////
//                             U S E R K O N T A K T S E I T E 
////////////////////////////////////////////////////////////////////////////
app.get('/userkontaktseite', function(req, res) {
  res.render('pages/05 UserKontaktSeite/Muster.ejs');
});

////////////////////////////////////////////////////////////////////////////
//                             R E G I S T E R 
////////////////////////////////////////////////////////////////////////////
// TODO: register page 
app.get('/register', function(req, res) {
  res.render('pages/register');
});

// Gehört getestet
app.post('/register', bodyParser.urlencoded({ extended: false }), async (req, res, next) => {
  const email_address = req.body.email_address;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const password = req.body.password;
  const telephone_number = req.body.telephone_number;
  const street = req.body.street;
  const house_number = req.body.house_number;
  const zip_code = req.body.zip_code;
  const city = req.body.city;
  const country = req.body.country;

  // Datenbankverbindung
  try {
  conn = await db.pool.getConnection();
  let userdata = await conn.query(`SELECT * FROM user WHERE email_address = '${email_address}'`);
  //const first_name_exists = await db.query('SELECT * FROM user WHERE first_name = $1', [first_name]);
  //const last_name_exists = await db.query('SELECT * FROM user WHERE last_name = $1', [last_name]);
  //const telephone_number_exists = await db.query('SELECT * FROM user WHERE telephone_number = $1', [telephone_number]);

  //console.log(userdata[0].email_address);

  //errorMessage = '';

  // Validierungen Aller Felder.
   if (email_address == userdata[0].email_address) {
    if ( !(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email_address))) {
      // validator.isEmail(email_address)
      return res.render('pages/register.ejs', { errorMessage: 'Irgendein anderer Fehler'});
      userdata = undefined;
      //return;
    } else {
      return res.render('pages/register.ejs', { errorMessage: 'Diese Email Existiert bereits'});
      userdata = undefined;
     //return;
    }
   }
   
   console.log(1);
   if (first_name.length > 0 && /^[a-zA-Z0-9_]{6, 16}$/.test(first_name)) {
     res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Namen eingeben'});
     return;
   }
   console.log(2);
   if (last_name.length > 0 && /^[a-fA-F0-]+$/.test(last_name)) {
     res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Namen eingeben'});
     return;
   }
   console.log(3);
   if (password.length > 0 && /^[a-zA-Z0-9]$/.test(password)) {
     res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Passwort eingeben'});
     return;
   }
   console.log(4);
   if (/^[0-9]{6, 10}$/.test(telephone_number) && telephone_number !== telephone_number_exists && telephone_number.length > 0) {
     res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Telefonnummer eingeben'});
     return;
   }
   console.log(5);
   if (/^[a-zA-Z]$/.test(street) && street.length > 0) {
     res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Straße eingeben'});
     return;
   }
   console.log(6);
   if (/^[0-9]{1, 6}$/.test(house_number) && house_number.length > 0) {
     res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Hausnummer eingeben'});
     return;
   }
   console.log(7);
   //console.log(userdata[0].zip_code);
   if (/^[0-9]{1, 6}$/.test(zip_code) && zip_code.length > 0) {
     res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Postleitzahl eingeben'});
     return;
   }
   console.log(8);
   if (/^[a-zA-Z]{6, 16}$/.test(city) && city.length > 0) {
     res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Stadt eingeben'});
     return;
   }
   console.log(9);
   if (/^[a-zA-Z]{2, 16}$/.test(country) && country.length > 0) {
     res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Land eingeben'});
     return;
   }
   console.log(10);
   // Validierungen
   if (email_address === "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$" || first_name === '^[a-zA-Z0-9_]{6,16}$' || last_name === '^[a-zA-Z0-9_]{6,16}$' || password === '' || telephone_number === '^[0-9]{6, 10}' || street === '' || house_number === '^[0-9]{1, 6}' || zip_code === '^[0-9]{4,5}' || city === '^[a-zA-Z]{6,16}$' || country === '') {
     res.render('pages/register.ejs', { errorMessage: 'Achtung ich bitte Sie die Daten richtig einzugeben'});
       return; // Return early if validation fails.
   }
   console.log(11);

   // insert data hier hinein
   let lastID;
  try {
      const lastIDResult = await db.pool.query("SELECT IFNULL(MAX(user_id), 0) AS lastuserid FROM user");
      lastID = lastIDResult[0].lastuserid;
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while inserting data.' });
      return; // Return early in case of an error.
  }

  // Increment the lastID to get the new BenutzerID
  const new_user_id = lastID + 1;

  const values = [new_user_id, email_address, first_name, last_name, password, 0, null, null, telephone_number, 3, street, house_number, zip_code, city, country];
  console.log(values.toString())
  try {
      const result = await db.pool.query(
          `INSERT INTO user (\`user_id\`, \`email_address\`, \`first_name\`, \`last_name\`, \`password\`, \`count_of_false_logins\`,  \`blocked_date\`, \`member_date\`,
                                 \`telephone_number\`, \`role_id\`, \`street\`,
                                 \`house_number\`, \`zip_code\`, \`city\`, \`country\`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          values
      );

      res.render('pages/register.ejs', { successMessage: 'Gratuliere Sie haben sich erfolgreich Registriert.'});
      return; 
  
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'DAta not inbsertet erroro.' });
  } 

} catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
} finally {
  if (conn) conn.end();
}

  

  
});

////////////////////////////////////////////////////////////////////////////
//                             L O G I N 
////////////////////////////////////////////////////////////////////////////
// TODO: login page
app.get('/login', function(req, res) {
   res.render('pages/login');
 });


app.post('/login', async function (req, res, next) {
  // werte von der Webseite bekommen
  let user_email_address = req.body.email_address;
  let user_password = req.body.password;

  let conn;
  if (user_email_address && user_password) {
     try {
          conn = await db.pool.getConnection();

          /// Fetch club settings data from the database using the appropriate column for filtering
          const userdata = await conn.query(`SELECT * FROM user WHERE email_address = '${user_email_address}'`);
          const userIdendifier = await conn.query(`SELECT user_id FROM user WHERE email_address = '${user_email_address}'`);


         if(userdata.length === 1 ){

             if (user_email_address === userdata[0].email_address && user_password === userdata[0].password){
                req.session.user_id = userdata[0].user_id;
                req.session.role_id = userdata[0].role_id;
                req.session.logged_in = true;

                if (userdata[0].role_id === 3){

                  res.redirect('/user/' + req.session.user_id);

                  // Validate user credentials
                  // if () {
                  //   req.session.userId = userId; // Set session identifier
                    
                  // }
                  //return res.render('register', {userdata, errorMessage: 'Yes, you are'});
                 } else if (userdata[0].role_id === 1) { 
                  console.log('admin noch nicht verfügbar');
                 } else {
                    console.log('other noch nicht verfügbar noch nicht verfügbar');
                 }
                 
             } else {
                 res.render('login', {userdata, errorMessage: 'Sie haben eine Falsche Email oder Password'});
            }
         }

          //console.log(userdata);
          //res.render('login', {userdata, errorMessage: 'Willkomen'});
      } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
      } finally {
          if (conn) conn.end();
      }



     /* conn = await db.pool.getConnection();
      conn.query = `SELECT *
               FROM user
               WHERE email_address = '${user_email_address}'`;

      console.log(conn.query.toString())

      console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");

      db.pool.query(query, function (error, data) {
          console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
          if (data.length > 0) {
              for (let count = 0; count < data.length; count++) {
                  // testen
                  if (data[count].password === user_password) {
                      req.session.user_id = data[count].user_id;
                      // zur seite weiterleiten
                      res.redirect('/user');
                      // if(user_id == getrole_id){
                      //   res.redirect('/admin');
                      // }
                      // else{
                      //   //res.redirect('/user');
                      // }

                  } else {
                      const error = 'Falsches Passwort!';
                      return res.render('login', { errorMessage: error });
                      //res.send('Falsches Passwort!');
                  }
              }
          } else {
              const error = 'Falsche E-Mail-Adresse!';
              return res.render('login', { errorMessage:  error });
              //res.send('Falsche E-Mail-Adresse!');
          }
          res.end();
      });*/
  } else {
      const error = 'Bitte füllen Sie alle Felder aus!';
      return res.render('login', { errorMessage: error });
      //res.send('Bitte füllen Sie alle Felder aus!');
      res.end();
  }
});

app.get('/logout', function(req, res,) {
  req.session.destroy();
  // wenn er die Applikation schließt muss die session auch bendet werden.
  res.redirect('/');
});

////////////////////////////////////////////////////////////////////////////
//                             U S E R 
////////////////////////////////////////////////////////////////////////////
// TODO: user page
app.get('/user/:userid',requireAuth, function(req, res) {
  // nicht nötig ihm login sondern nachher beim routing.

  if(req.session.role_id === 3)
    res.render('pages/user');
  else
    res.render('pages/admin');
});

////////////////////////////////////////////////////////////////////////////
//                             R O L E 
////////////////////////////////////////////////////////////////////////////
// TODO: role page
app.get('/role', function(req, res) {
  res.render('pages/role');
});
////////////////////////////////////////////////////////////////////////////
//                             C O U R T 
////////////////////////////////////////////////////////////////////////////
// TODO: court page
app.get('/court', function(req, res) {
  res.render('pages/court');
});

////////////////////////////////////////////////////////////////////////////
//                             C O U R T  R E S E R V A T I O N
////////////////////////////////////////////////////////////////////////////
// TODO: court_reservation page
app.get('/court_reservation', function(req, res) { 
  //
  Court_reservation.findAll().then( reservation_list => {
    res.render('pages/court_reservation', {
      Reservation_type: reservation_list
    });
  });
});

////////////////////////////////////////////////////////////////////////////
//                             R E S E R V A T I O N
////////////////////////////////////////////////////////////////////////////
// TODO: reservation types page
app.get('/reservation_type', function(req, res) { 
  //
  Reservation_type.findAll().then( reservation_list => {
    res.render('pages/reservation_type', {
      Reservation_type: reservation_list
    });
  });
});

////////////////////////////////////////////////////////////////////////////
//                             I M P R E S S U M 
////////////////////////////////////////////////////////////////////////////
// TODO: impressum page
// Fehlt Seite

////////////////////////////////////////////////////////////////////////////
//                             D S G V O 
////////////////////////////////////////////////////////////////////////////
// TODO: datenschutzerklärung page
// Fehlt Seite





// Globale Fehlerbehandlung
app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: "UUUPS! Da ist richtig was falsch gelaufen!"
    });
});

// Listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

