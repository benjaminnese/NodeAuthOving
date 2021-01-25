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
    User.findById(id).then(user => {
        done(null,user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID, //nøkkel fra keys.js lagret i keys.ID.. og keys.Secret..
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback', //ruten som bruker blir sendt til når de får verdifisert innlogg
        proxy: true   //dealt with it google, om ikke proxy:true så får man http, må ha absolutt filepath for https her
    }, 
    async(accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({  googleId: profile.id })
        
        if(existingUser){
            done(null, existingUser); //null = ingen feil her, vi er ferdig her har vi brukeren vi har funnet
        }    
        else{   
            const user = await new User({googleId: profile.id}).save();
            done(null, user);
        }                                            //profile.id kommer fra google profilen
                                                    //.save vil da lagre bruker i databasen, mongoDB
            
             
    })       
);