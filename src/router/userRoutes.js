const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const { userById, createUser, loginUser, deleteUserById } = require('../controller/userController')
const { protect } = require('../middleware/authMiddleware')
const { followUser, unFollowUser } = require('../controller/followController')

router.post('/register',createUser)

router.post('/login',loginUser)

router.put('/:id',(req,res)=>{
    res.json({"sending from router":"1"})
})

router.delete('/:id',deleteUserById)
router.get('/',protect, userById)

router.put('/follow/:id',protect,followUser)
router.put('/unfollow/:id',protect,unFollowUser)

module.exports = router