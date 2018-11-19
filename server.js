var express = require('express');
var bodyParser = require('body-parser');
var app  = express();
var cors = require('cors');
var morgan = require('morgan')
var config = require('./src/config/config');
var connection = require('./src/config/connection');
var userRoute = require('./src/routes/userRoute');
var adminRoute = require('./src/routes/adminRoute');
var path = require('path');

app.use(bodyParser.json({limit:"100mb"}));

app.use(cors());
app.use(morgan('dev'));

app.use('/user', userRoute);
app.use('/admin', adminRoute);

app.use(express.static(path.join(__dirname, 'public', 'dist', 'BlitzBuddyAdmin')));

app.get('*', (req, res)=>{

    res.sendFile(path.join(__dirname, 'public', 'dist', 'BlitzBuddyAdmin', 'index.html'));
})


app.listen(config.PORT, ()=>{
    console.log("server listening on port ",config.PORT)
});