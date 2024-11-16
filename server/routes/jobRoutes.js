import express from 'express';
import { getJobs, applyForJob, createJob, deleteJob, updateJob } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route( '/' ).get( getJobs ).post( protect, createJob );

// Apply protect middleware:only authorized user can apply for jobs
router.route( '/:id/apply' ).post( protect, applyForJob );
router.route( '/:id/delete' ).post( protect, deleteJob );
router.route( '/:id/' ).post( protect, updateJob );

export default router;
