const express = require('express')
const path=require('path')
const bodyparser=require( "body-parser")
const session=require('express-session')
const {v4:uuidv4}=require('uuid')
const router=require('./router')
const nocache = require('nocache');

const app =express()

const port= process.env.port||65535;

app.use(nocache())

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(session({   
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:3600000}
}))

app.use('/',router)

app.listen(port,()=>{
    console.log("http://localhost:65535")
})
