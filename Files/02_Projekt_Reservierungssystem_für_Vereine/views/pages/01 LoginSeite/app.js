const express = require('express');
const router = express.Router();

const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3000;

const db = require('./db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('pages/index', {title : 'Testen', session: req.session});
//   });

app.get('/login', function(req, res) {
    console.log(__dirname);
     res.render('pages/01 LoginSeite/login');
   });

app.get('/02 RegistrierungsSeite/Projekt_RegistrierungsSeite', function(req, res) {
    res.render('Projekt_RegistrierungsSeite');
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



           if(userdata.length > 0 ){
               console.log(user_email_address);
               console.log(userdata[0].email_address);
               console.log(user_password);
               console.log(userdata[0].password);

               if (user_email_address === userdata[0].email_address && user_password === userdata[0].password){
                   if (userdata[0].role_id === 3){

                       console.log("HHHHHHHHHHHOH=OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
                       app.get('/Projekt_BenutzerHauptSeite.html', function(req, res) {
                           res.render('Projekt_UserAccount');
                       });
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



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(__dirname);
});

module.exports = router;

// packages to install:
// npm install express express-session --save
// npm install express --views=ejs

// npm install -g express-generator