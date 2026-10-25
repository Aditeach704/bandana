const session=require('express-session');
module.exports=session({name:'bandana.sid',secret:process.env.SESSION_SECRET||'CHANGE-THIS-LOCAL-ONLY-BANDANA-SESSION-SECRET',resave:false,saveUninitialized:false,cookie:{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',maxAge:1000*60*60*8}});
