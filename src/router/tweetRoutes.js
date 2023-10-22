const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.json({"sending from router":"1"})
})

router.post('/',(req,res)=>{
    res.json({"sending from router":"1"})
})

router.put('/:id',(req,res)=>{
    res.json({"sending from router":"1"})
})

router.delete('/:id',(req,res)=>{
    res.json({"sending from router":"1"})
})
router.get('/:id',(req,res)=>{
    res.json({"sending from router":"1"})
})

module.exports = router