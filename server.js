const express = require('express')
const path=require('path')
const bodyparser=require( "body-parser")
const session=require('express-session')
const {v4:uuidv4}=require('uuid')
const router=require('./router')

const app =express()

const port= process.env.port||65535;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine','ejs');

app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(session({   //create session and make its completely secret and unique
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))

app.use('/route',router)

app.get('/',(req,res)=>{
    res.render('base',{title:'Login page'})
})


app.listen(port,()=>{
    console.log("http://localhost:65535")
})