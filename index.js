// pw heroku :dgb@123456
const express = require('express'); 
const app = express();

app.get('/', (req, res) =>{
    res.send({hi: 'there'});
});

//Port fra heroku eller 5000 om lokalt
const PORT = process.env.PORT || 5000;
app.listen(PORT);