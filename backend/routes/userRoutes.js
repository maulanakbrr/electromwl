import express from 'express'
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// see user routes
router.post('/login', authUser)

router.route('/').post(registerUser)

// to use middleware, you can pass as the first argument
// ex: get('middleware', 'funtion-for-get')
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router
