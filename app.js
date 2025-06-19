const express = require('express');
const path = require('path');
const hbs = require('hbs');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:4200', // allow Angular
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept',
  credentials: true
};

require('dotenv').config();

// === MONGOOSE & MODELS ===
require('./app_api/models/db');
require('./app_api/models/travlr'); // Trip schema

require('./app_api/models/user');
require('./app_api/config/passport');


// === ROUTES ===
const indexRouter = require('./app_server/routes/index');
const travelRouter = require('./app_server/routes/travel');
const apiRouter = require('./app_api/routes/index');

const app = express();

const passport = require('passport');
app.use(passport.initialize());

// === VIEW ENGINE SETUP (Handlebars) ===
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, 'public')));

// === ROUTING ===
app.use('/', indexRouter);           // Website home page
app.use('/travel', travelRouter);    // MVC travel routes
app.use('/api', apiRouter);          // API for Angular

// === CLEAN URL FALLBACK (e.g. /rooms → /rooms.html) ===
app.get('/:page', (req, res, next) => {
  const page = req.params.page;
  const filePath = path.join(__dirname, 'public', `${page}.html`);
  res.sendFile(filePath, err => {
    if (err) next(); // Let Express handle 404
  });
});

app.use((req, res) => {
  res.status(404);
  res.render('error', { message: 'Page Not Found' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
