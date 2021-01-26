const passport = require('passport');

module.exports = app => {
    app.get(
        '/auth/google', 
        passport.authenticate('google', { //'google', GoogleStrategy idenfiserer seg til passport som 'google' under the hood 
          scope: ['profile','email'] //henter ut profil og email fra google brukeren
        })
    );

    app.get('/auth/google/callback', //google har sendt tilbake info om bruker
      passport.authenticate('google'), //passport ser dette og bruker den info til lage profil
      (req, res) => {                 //sender videre til surveys
        res.redirect('/surveys')
      }
    );                                                 
    app.get('/api/logout', (req, res)=>{
        req.logout();
        res.redirect('/');
    })
    app.get('/api/current_user', (req, res) => {
      res.send(req.user);
    });

};


