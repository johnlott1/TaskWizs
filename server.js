const express = require("express");

// load environment variables in development mode
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const usePassport = require("./config/passport");
const session = require("express-session");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const flash = require("connect-flash");
const path = require("path");
const helpers = require('./utils/taskHelpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// set up Handlebars as the template engine
// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// parse incoming request data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// enable method override for PUT & DELETE requests
app.use(methodOverride("_method"));

// initialize Passport for authentication
usePassport(app);

// flash messages middleware
app.use(flash());

// set local variables for views
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// include routes
app.use(routes);

// start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});