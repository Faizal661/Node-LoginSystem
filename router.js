var express=require('express')
var url =require('url')
var router=express.Router();

const credentials={
    username:'a',
    password:'s'
}
 
router.get('/',(req,res)=>{
    res.render('base',{title:'Login page'})
})


//login
router.post('/login',(req,res)=>{
    if(req.body.username==credentials.username&&req.body.password==credentials.password){
        req.session.user=req.body.username;
        res.redirect('/homepage')
    }else{
        //res.render('base',{invalid:'Incorrect Usename and password'})
        res.redirect('/?invalid')
    }
});


// Middleware to protect routes
function requireLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        next();
    }
}

//blocking authorised user going back to loginpage
// function blockBackGoing(req,res,next){
//     if(req.session.user){
//         res.render('homepage',{user:req.session.user})
//     }
// }

//homepage 
router.get('/homepage', requireLogin,(req,res)=>{
    if(req.session.user){
        res.render('homepage',{user:req.session.user})
    }else{
        res.render('homepage',{msg:"Unauthorized User"}) 
    }
})

//logout
router.get('/logout',requireLogin,(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err)
            res.send("Error")
        }else{
            // res.render('base',{logout:"logout successfully...!"}) 
            res.redirect('/?logout')
        }
    })
})

router.get('*',(req,res)=>{
    res.send('page not found'+req.url)
})

module.exports=router;
