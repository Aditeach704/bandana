module.exports=(req,res,next)=>req.session?.user?.role==='staff'?next():res.status(403).json({error:'Staff access required'});
