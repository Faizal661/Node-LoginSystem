var express=require('express')
var router=express.Router();

const credentials={
    username:'faizal',
    password:'1234'
}


//login
router.post('/login',(req,res)=>{
    if(req.body.username==credentials.username&&req.body.password==credentials.password){
        req.session.user=req.body.username;
        res.redirect('/route/homepage')
    }else{
       // res.end('Invalid Username and Password')
        res.render('base',{invalid:"Invalid Username or Password"})
    }
});


//homepage
router.get('/homepage',(req,res)=>{
    if(req.session.user){
        res.render('homepage',{user:req.session.user})
    }else{
        res.send('Unauthorised user')
    }
})

//logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err)
            res.send("Error")
        }else{
            res.render('base',{logout:"logout successfully...!"})
        }
    })
})


module.exports=router;