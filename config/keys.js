
if(process.env.NODE_ENV === 'production'){ //hvis i produksjon
    module.exports = require('./prod');
}
else{
   module.exports =  require('./dev'); //hent, returner med engang
}
