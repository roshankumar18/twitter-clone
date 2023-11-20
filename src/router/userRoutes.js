const express = require('express')
const router = express.Router()
const { userById, createUser, loginUser, deleteUserById, getUser, getTimelines, uploadImage } = require('../controller/userController')
const { protect } = require('../middleware/authMiddleware')
const { followUser, unFollowUser } = require('../controller/followController')
const upload = require('../upload')



router.put('/',upload.single('image'),protect,uploadImage)

router.post('/register',createUser)

router.post('/login',loginUser)

router.get('/timelines' ,protect,getTimelines)


router.delete('/:id',deleteUserById)
router.get('/',protect, getUser)
router.get('/:id',userById)

router.put('/follow/:id',protect,followUser)
router.put('/unfollow/:id',protect,unFollowUser)


module.exports = router 