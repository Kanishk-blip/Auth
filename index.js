const express=require('express');
const jwt=require('jsonwebtoken');
const app=express();
const Secret='justarandomecalliloveben10';
app.use(express.json());
const user=[];
 function auth (req,res,next){
    let loggedin=false;
    const token=req.headers.token;
    const decrypt=jwt.verify(token,Secret);
    if(decrypt.username){
        req.username=decrypt.username;
        loggedin=true;
    }
    if(loggedin){
        // res.json({
        //     message:"user is loggedin"
        // })
        next();
    }else{
        res.json({
            message:"user is not loggedin"
        })
        return;
    }
}
app.get('/',function (req, res){
     res.sendFile(__dirname+"/public/index.html");
})
app.post('/signup',function (req,res){
    const username=req.body.username;
    const password=req.body.password;
    //   console.log("Current users:", user);
    user.push({
        username:username,
        password:password
    });
    //   console.log("Current users:", user);
    res.json({
        message:"user created"
    })
})
app.post('/signin',function (req,res){
    const username=req.body.username;
    const password=req.body.password;
    let weAreGoodToGo=false;
    // console.log("Current users:", user);
    for(let i=0;i<user.length;i++){
        if(user[i].username===username && user[i].password===password){
            weAreGoodToGo=true;
            break;
        }
    }
    let token;
    if(weAreGoodToGo){
        token=jwt.sign({
            username:username
        },Secret);
          res.json({
       Token: token
    })
    }else{
        res.json(
          {  message:"credentials are wrong"
        })
        return ;
    }
   
})
app.get('/me',auth,function(req,res){
    let password;
    for(let i=0;i<user.length;i++){
        if(user[i].username=== req.username){
            password=user[i].password
            break;
        }
    }
    res.json({
        username:req.username,
        password:password
    })
})
app.listen(3000);