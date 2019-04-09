const express = require('express');
const path = require('path');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const axios = require('axios');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const keys = require('./keys');
const apiRouter = require('./apiRouter');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

const users = [];

passport.serializeUser((user, done) => {
  if (user == null) {
    done(new Error('User not found'), null);
  } else {
    done(null, user.id);
  }
});

passport.deserializeUser((id, done) => {
  let user = users.filter(x=> x.id === id)[0];
  if (user == null || user == undefined) {
    done(new Error("Couldn't find user"), undefined);
  } else {
    done (null, user);
  }
});

const example = {
  username: 'Serenity',
  locale: 'en-US',
  mfa_enabled: true,
  flags: 256,
  avatar: '62a44dac07566bb04f155dbf67da9522',
  discriminator: '0783',
  id: '192750776005689344'
};

passport.use(new OAuth2Strategy({
  authorizationURL: 'https://discordapp.com/api/oauth2/authorize',
  tokenURL: 'https://discordapp.com/api/oauth2/token',
  clientID: keys.oauth.clientID,
  clientSecret: keys.oauth.clientSecret,
  callbackURL: "http://localhost:3000/auth/callback",
  scope: "identify"
},
function(accessToken, refreshToken, profile, done) {
  // do shit with the profile we got
  axios.get('https://discordapp.com/api/users/@me', {
    headers: {'Authorization' : ("Bearer " + accessToken)}
  }).then((resp) => {
    if (users.filter(x => x.id === resp.data.id).length == 0) {
      users.push(resp.data);
    }
    done(null, resp.data);
  }).catch(err => {
    done(err, null);
  });
}
));

app.use(bodyParser.json());

app.use(express.static(publicPath));
app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(err, req, res, next) {
  if (err) {
    if(req.originalUrl.includes('api')) {
      console.log(err);
      next(err);
      return;
    }
    req.logout();
    if (req.originalUrl == "/") {
      next(); // never redirect login page to itself
    } else {
      res.redirect("/auth/login");
    }
  } else {
    next();
  }
});

app.use('/api', apiRouter);

app.get('/auth/login', passport.authenticate('oauth2'));

app.get('/auth/callback',
  passport.authenticate('oauth2', { successRedirect: '/reactAuth',
                                      failureRedirect: '/' }));

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/')
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up!');
});