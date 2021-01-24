// pw heroku :dgb@123456
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport'); //rekkefølgen viktig, ettersom de laster inn nødvendigdata


mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000, //skal vare i 30 dager, er i ms
      keys: [keys.cookieKey] //hash cookie så ikke kan fakes?? usikker her
  })  
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

//Port fra heroku eller 5000 om lokalt
const PORT = process.env.PORT || 5000;
app.listen(PORT);
