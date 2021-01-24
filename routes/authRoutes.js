const passport = require('passport');

module.exports = (app) => {
    app.get(
        '/auth/google', 
        passport.authenticate('google', { //'google', GoogleStrategy idenfiserer seg til passport som 'google' under the hood 
          scope: ['profile','email'] //henter ut profil og email fra google brukeren
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google')); //google har sendt tilbake info om bruker
                                                                   //passport ser dette og bruker den info til lage profil
    app.get('/api/logout', (req, res)=>{
        req.logout();
        res.send(req.user);
    })
    app.get('/api/current_user', (req, res) => {
      res.send(req.user);
    });

}