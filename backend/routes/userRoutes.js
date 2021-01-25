import express from 'express'
import { authUser, getUserProfile, registerUser } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', authUser)

router.route('/').post(registerUser)

// to use middleware, you can pass as the first argument
router.route('/profile').get(protect, getUserProfile)

export default router
