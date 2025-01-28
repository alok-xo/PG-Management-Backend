import express from 'express';
import { registerUser, loginUser, registerAdmin, registerManager, register } from '../controller/authController.js';

const router = express.Router();

router.post('/register/user', registerUser);

// Admin Routes
router.post('/register/admin', registerAdmin);

// Manager Routes
router.post('/register/manager', registerManager);

router.post("/register", register);

// Single Login Route for All Roles
router.post('/login', loginUser);

export default router;
