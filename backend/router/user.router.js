import express from 'express'
import { getUser, login, logout, register } from '../controller/userController.js'
import { isAuthenticated } from '../middleware/auth.js'

const router = express.Router()

router.post('/register', register) 
router.post('/login', login) 
router.get("/me", isAuthenticated, getUser)
router.get('/logout',isAuthenticated, logout)
//http://localhost:4040/api/v1/user/regester
//http://localhost:4040/api/v1/user/regester

export default router;