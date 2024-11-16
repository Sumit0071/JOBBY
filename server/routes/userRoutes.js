import express from 'express';
import {
    createUser,
    getUsers,
    likeUser,
    loginUser,
    updateUserCountry // Add a new controller for country update
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js'; // Assume adminOnly is added to check for admin role

const router = express.Router();

// Route to get all users and create a new user
router.route( '/user-list' )
    .get( protect, getUsers ); // Protect user listing; can add role-based check in the controller if required
    router.route('/register').post(createUser);

// Route for user login
router.route('/login').post(loginUser);

// Route to like a user (only authenticated users)
router.route('/:id/like').post(protect, likeUser);

// Route to update the user's selected country
router.route('/update-country').post(protect, updateUserCountry); // Protect with auth and allow all roles

export default router;
