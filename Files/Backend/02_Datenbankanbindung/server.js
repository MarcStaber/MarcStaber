require('dotenv').config();

const express = require('express');
const app = express();

// Middleware
app.use(express.json());    // parse json bodies in the request object


// Routen bzw. Redirects 
app.use("/user", require("./routes/userRoutes"));
app.use("/court", require("./routes/courtRoutes"));
app.use("/role", require("./routes/roleRoutes"));
app.use("/reservation_type", require("./routes/reservationTypeRoutes"));
app.use("/court_reservation", require("./routes/courtReservationRoutes"));
app.use("/club_data", require("./routes/clubDataRoutes"));
app.use("/address_lookup", require("./routes/addressLookupRoutes"));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file


// index page
app.get('/', function(req, res) {
    var mascots = [
      { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
      { name: 'Tux', organization: "Linux", birth_year: 1996},
      { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
    ];
    var tagline = "No programming concept is complete without a cute animal mascot.";
  
    res.render('pages/index', {
      mascots: mascots,
      tagline: tagline
    });
  });
  

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});


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