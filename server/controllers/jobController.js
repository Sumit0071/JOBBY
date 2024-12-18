import Job from '../models/job.js';
import User from '../models/user.js';

export const getJobs = async ( req, res ) => {
  try {
    const jobs = await Job.find().populate( 'usersApplied', 'name' );
    res.json( jobs );
  } catch ( error ) {
    res.status( 500 ).json( { message: error.message } );
  }
};

export const applyForJob = async ( req, res ) => {
  try {
    const job = await Job.findById( req.params.id );

    if ( !job ) {
      return res.status( 404 ).json( { message: 'Job not found' } );
    }

    // Ensure the user is authenticated
    const user = req.user;

    if ( !user ) {
      return res.status( 401 ).json( { message: 'User not authenticated' } );
    }

    // Ensure user exists in the database using custom id field
    const existingUser = await User.findOne( {_id:user.id } );

    if ( !existingUser ) {
      return res.status( 404 ).json( { message: 'User not found' } );
    }

    // Add the user who applied for the job
    if ( !job.usersApplied.includes( existingUser.id ) ) {
      job.usersApplied.push( existingUser.id );
      await job.save();
      res.json( { message: 'User applied for the job', job } );
    } else {
      res.status( 400 ).json( { message: 'User has already applied for this job' } );
    }
  } catch ( error ) {
    res.status( 500 ).json( { message: error.message } );
  }
};


// Create a new job
export const createJob = async ( req, res ) => {
  const { link, title, description } = req.body;

  try {
    // Retrieve the user from the request, which should be set by the protect middleware
    const user = req.user;

    // Check if the user is an admin
    if ( user.role !== 'Admin' ) {
      return res.status( 403 ).json( { message: 'Only admins can create jobs' } );
    }

    // Validate job link and title
    if ( !link || !title || !description ) {
      return res.status( 400 ).json( { message: 'Job link, title and description are required' } );
    }

    // Create a new job

    const job = new Job( { link, title, description } );
    const createdJob = await job.save();

    // Respond with the created job
    res.status( 201 ).json( {
      message: 'Job created successfully',
      job: createdJob
    } );
  } catch ( error ) {
    res.status( 500 ).json( { message: error.message } );
  }
};
// Update an existing job
export const updateJob = async ( req, res ) => {
  const { id } = req.params;
  const { link, title, description } = req.body;

  try {
    // Retrieve the user from the request, which should be set by the protect middleware
    const user = req.user;

    // Check if the user is an admin
    if ( user.role !== 'Admin' ) {
      return res.status( 403 ).json( { message: 'Only admins can update jobs' } );
    }

    // Find the job by ID
    const job = await Job.findById( id );

    if ( !job ) {
      return res.status( 404 ).json( { message: 'Job not found' } );
    }

    // Update job fields
    job.link = link || job.link;
    job.title = title || job.title;
    job.description = description || job.description;

    const updatedJob = await job.save();

    res.json( {
      message: 'Job updated successfully',
      job: updatedJob,
    } );
  } catch ( error ) {
    res.status( 500 ).json( { message: error.message } );
  }
};

// Delete an existing job
export const deleteJob = async ( req, res ) => {
  const { id } = req.params;

  try {
    // Retrieve the user from the request, which should be set by the protect middleware
    const user = req.user;

    // Check if the user is an admin
    if ( user.role !== 'Admin' ) {
      return res.status( 403 ).json( { message: 'Only admins can delete jobs' } );
    }

    // Find and delete the job by ID
    const job = await Job.findByIdAndDelete( id );

    if ( !job ) {
      return res.status( 404 ).json( { message: 'Job not found' } );
    }

    res.json( { message: 'Job deleted successfully' } );
  } catch ( error ) {
    res.status( 500 ).json( { message: error.message } );
  }
};

