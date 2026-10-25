module.exports=(req,res,next)=>req.session?.user?next():res.status(401).json({error:'Sign in required'});
