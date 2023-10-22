const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const { userById, createUser, loginUser } = require('../controller/userController')

router.post('/register',createUser)

router.post('/login',loginUser)

router.put('/:id',(req,res)=>{
    res.json({"sending from router":"1"})
})

router.delete('/:id',(req,res)=>{
    res.json({"sending from router":"1"})
})
router.get('/:id',userById)

module.exports = router