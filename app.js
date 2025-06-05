const express = require('express');
const path = require('path');
const hbs = require('hbs');

const indexRouter = require('./app_server/routes/index');
const travelRouter = require('./app_server/routes/travel');
const apiRouter = require('./app_api/routes/index');

require('./app_api/models/db');

const app = express();

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/travel', travelRouter);

// Redirect clean routes like "/rooms" to static HTML files like "/rooms.html"
app.get('/:page', (req, res, next) => {
  const page = req.params.page;
  const filePath = path.join(__dirname, 'public', `${page}.html`);
  res.sendFile(filePath, err => {
    if (err) {
      next(); // Let Express handle 404 if file doesn't exist
    }
  });
});

// Catch 404
app.use((req, res) => {
  res.status(404);
  res.render('error', { message: 'Page Not Found' });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
