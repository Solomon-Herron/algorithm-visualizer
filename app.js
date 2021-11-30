require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; 
let publicPath = __dirname + '/public';
let homePath = __dirname + '/views/login.html';
let newuserPath = __dirname + '/views/newuser.html';
let indexPath = __dirname + '/views/index.html';

/* Routing*/
app.use('/public', express.static(publicPath));

app.get('/', (req, res)=>{
    res.sendFile(homePath);
})

app.get('/index', (req, res)=>{
    res.sendFile(indexPath);
})

app.listen(port);

//  TODO
//  BROKEN CRUD OPERATIONS WITH MONGODB
/*

app.get('/newuser', (req, res)=>{
    res.sendFile(newuserPath);
})
app.use(bodyParser.urlencoded({extended : false}));
app.use( bodyParser.json() );
app.use(express.json());     
app.use(express.urlencoded());

const mongoose = require('mongoose');
const mongoURI = process.env['MONGO_URI'];
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const { Schema } = mongoose;
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String
});
const User = mongoose.model('User', userSchema);

const CryptoJS = require("crypto-js");
const encryptionKey = process.env.ENCRYPTION_PASSCODE;


app.post('/newuser', (req, res)=>{
    try{
        let newuser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: CryptoJS.AES.encrypt(req.body.password, encryptionKey)
    });
    newuser.save((err, data)=>{
        if (err){ return done(error)};
        done(null, data)
    })
    } catch(error){
        console.log("fucking errors again")
    } 
   
})

TODO login handler 
app.post('/login', (req, res)=>{
    User.find({username: req.body.username}, (err, personFound)=>{
        if (err) return done(err);
        done(null, userFound);
        let bytes = CryptoJS.AES.decrypt(userFound[0].password, encryptionKey);
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        if(req.body.password === originalText){
            next();
        } else { return error }
    }), 
    ()=> res.sendFile(indexPath);

})
*/

