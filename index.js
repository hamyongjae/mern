require('./services/passport');

const User = require('./models/User');

const auth = require('./routes/auth');
const users = require('./routes/users'); // 추가
const home = require('./routes/home');
const keys = require('./config/default');

const cookieSession = require('cookie-session');
const passport = require('passport'); 
const mongoose = require('mongoose');
const express = require("express");
const app = express();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error(error.message));

app.use(
  cookieSession({
    name: 'MERN cookie',
    maxAge: (30 * 24 * 60 * 60 * 1000),
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth/google', auth);
app.use('/api/users', users); // 추가
app.use(home);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));