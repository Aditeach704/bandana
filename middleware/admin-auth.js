module.exports=(req,res,next)=>req.session?.user?.role==='admin'?next():res.status(403).json({error:'Admin access required'});
