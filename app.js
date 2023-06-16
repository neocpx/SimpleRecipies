require('dotenv').config();
const express =require('express');
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const cookieParser= require('cookie-parser');
const MongoStore= require('connect-mongo')

const connectDB=require('./server/config/db');
const session = require('express-session');

const app=express();
const PORT=5000 || process.env.PORT;

connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
    secret: "nitro ninja on board",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
}));

app.use(express.static('public'))

app.use(expressLayouts);
app.set('layout','./layouts/main')
app.set('view engine','ejs')

app.use('/',require('./server/routes/main'));
app.use('/',require('./server/routes/admin'));

app.listen(PORT,()=>{
    console.log(`App is working at port ${PORT}`);
});