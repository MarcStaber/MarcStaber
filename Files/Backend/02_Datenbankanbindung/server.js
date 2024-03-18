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

const app = express();

app.use(express.static(__dirname + '/public'))
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
  methods: ['GET','POST','DELETE'],
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

// function validateString(a, b) {

// }



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

// count of false login // wenn sich jemand z.b. 5 mal das falsche password eingibt soll er gesperrt werden.
app.post('/register', bodyParser.urlencoded({ extended: false }), async (req, res, next) => {

  // Datenbankverbindung
  try {
  conn = await db.pool.getConnection();

  let email_address = req.body.email_address;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let password = req.body.password;
  let telephone_number = req.body.telephone_number;
  let street = req.body.street;
  let house_number = req.body.house_number;
  let zip_code = req.body.zip_code;
  let city = req.body.city;
  let country = req.body.country;

  let userdata = await conn.query(`SELECT * FROM user WHERE email_address = '${email_address}'`);

  if(userdata.length != 0) {
    if (email_address.length > 0) {
      if (userdata[0].email_address == email_address)  {
        return res.render('pages/register.ejs', { errorMessage: 'Diese Email Existiert bereits'});
      }
      else if (!(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email_address))){
        return res.render('pages/register.ejs', { errorMessage: 'Ihre Validierung passt nicht'});
      }
      else {
        return res.render('pages/register.ejs', { errorMessage: 'Irgendein anderer Fehler'});
      }
    }
  }
   
   console.log(1);
   if ((/^[a-zA-Z]{2,30}$/.test(first_name)) && first_name.length > 0) {
     res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Vornamen eingeben'});
     return;
   }
   console.log(2);
   if (!(/^[a-zA-Z]{2,30}$/.test(last_name)) && last_name.length > 0) {
     res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Nachnamen eingeben'});
     return;
   }
   console.log(3);
   if (password.length > 0 && !(/^[a-zA-Z0-9]$/.test(password))) {
     res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Passwort eingeben'});
     return;
   }
   console.log(4);
   if (!(/^[0-9]{6,10}$/.test(telephone_number)) && telephone_number.length > 0) {
     res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Telefonnummer eingeben'});
     return;
   }
   console.log(5);
   if (!(/^[a-zA-Z]$/.test(street)) && street.length > 0) {
     res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Straße eingeben'});
     return;
   }
   console.log(6);
   if (!(/^[0-9]{1,6}$/.test(house_number)) && house_number.length > 0) {
     res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Hausnummer eingeben'});
     return;
   }
   console.log(7);
   if (!(/^[0-9]{1,6}$/.test(zip_code)) && zip_code.length > 0) {
     res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Postleitzahl eingeben'});
     return;
   }
   console.log(8);
   if (!(/^[a-zA-Z]{6,16}$/.test(city)) && city.length > 0) {
     res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Stadt eingeben'});
     return;
   }
   console.log(9);
   if (!(/^[a-zA-Z]{2,16}$/.test(country)) && country.length > 0) {
     res.render('pages/register.ejs', { errorMessage: 'Sie müssen einen gültigen Land eingeben'});
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

  // Increment the lastID to get the new BenutzerID
  const new_user_id = lastID + 1;
  const values = [new_user_id, email_address, first_name, last_name, password, 0, null, null, telephone_number, 3, street, house_number, zip_code, city, country];
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
          //const userIdendifier = await conn.query(`SELECT user_id FROM user WHERE email_address = '${user_email_address}'`);


         if(userdata.length === 1 ){

             if (user_email_address === userdata[0].email_address && user_password === userdata[0].password){
                req.session.user_id = userdata[0].user_id;
                req.session.role_id = userdata[0].role_id;
                req.session.logged_in = true;

                if (userdata[0].role_id === 3){

                  res.redirect('/user/' + req.session.id);
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

