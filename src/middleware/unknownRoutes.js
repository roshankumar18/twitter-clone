module.exports =  (req,res,next)=>{
    res.status(500).json({"message":"Not implemented"})
    next()
}