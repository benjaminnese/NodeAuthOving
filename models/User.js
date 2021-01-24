const mongoose = require('mongoose');
const {Schema} = mongoose;



const userSchema = new Schema({
    googleId: String
});

mongoose.model('users', userSchema); //vi forteller moongose vi vil lage en ny collection 