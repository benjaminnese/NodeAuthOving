const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys'); //nøkkelen er lagret i keys.js,
const nodemon = require('nodemon');
                                       //en fil som ikke blir pushet til git

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);     //ikke samme som profile.id, user.id generet primærnøkkel fra mongo
});

passport.deserializeUser((id, done)=> {  //gjør id tilbake til bruker, retunere bruker
    User.findById(id)
    .then(user => {
        done(null,user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID, //nøkkel fra keys.js lagret i keys.ID.. og keys.Secret..
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback' //ruten som bruker blir sendt til når de får verdifisert innlogg
    }, 
    (accessToken, refreshToken, profile, done) => {
        User.findOne({  googleId: profile.id }) //reture løfte
            .then((existingUser)=>{
                if(existingUser){
                    //har allerede bruker lagt inn i systemet
                    done(null, existingUser); //null = ingen feil her, vi er ferdig her har vi brukeren vi har funnet
                }    
                else{   
                    new User({googleId: profile.id}).save()
                    .then(user => done(null, user));
                
                }                                            //profile.id kommer fra google profilen
            });                                              //.save vil da lagre bruker i databasen, mongoDB
            
        
             
    })       
);