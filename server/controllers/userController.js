// controllers/userController.js
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = ( id ) => {
    return jwt.sign( { id }, process.env.JWT_SECRET, { expiresIn: '30d' } );
};

export const getUsers = async ( req, res ) => {
    try {
        const users = await User.find( { country: req.user.country } ).select( 'username country points role' );
        res.json( users );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

export const likeUser = async ( req, res ) => {
    try {
        const user = await User.findById( req.params.id );
        if ( user && user.country === req.user.country ) {
            user.points += 1;
            await user.save();
            res.json( { message: 'User liked', user } );
        } else {
            res.status( 404 ).json( { message: 'User not found or unauthorized access' } );
        }
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

export const createUser = async ( req, res ) => {
    const { username, password, role, country } = req.body;

    if ( !username || !country || !password ) {
        return res.status( 400 ).json( { message: 'Username, password, and country are required' } );
    }

    try {
        if ( role === 'Admin' ) {
            const existingAdmin = await User.findOne( { role: 'Admin' } );
            if ( existingAdmin ) {
                return res.status( 403 ).json( { message: "Admin already exists. Cannot create another admin." } );
            }
        }

        const existingUser = await User.findOne( { username } );
        if ( existingUser ) {
            return res.status( 409 ).json( { message: 'User already exists' } );
        }

        const salt = await bcrypt.genSalt( Number( process.env.SALT ) );
        const hashedPassword = await bcrypt.hash( password, salt );

        const user = new User( {
            username,
            country,
            password: hashedPassword,
            role: role || 'Viewer',
        } );

        const createdUser = await user.save();
        console.log( createUser )
        res.status( 201 ).json( {
            message: 'User created successfully',
            user: {
                id: createdUser._id,
                username: createdUser.username,
                country: createdUser.country,
                points: createdUser.points,
                role: createdUser.role,
            },
            token: generateToken( createdUser._id ),
        } );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

export const loginUser = async ( req, res ) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne( { username } );
        if ( user && ( await bcrypt.compare( password, user.password ) ) ) {
            res.json( {
                message: 'Login successful',
                user: {
                    id: user._id,
                    username: user.username,
                    country: user.country,
                    points: user.points,
                    role: user.role,
                },
                token: generateToken( user._id ),
            } );
        } else {
            res.status( 401 ).json( { message: 'Invalid credentials' } );
        }
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Controller to update user's country
export const updateUserCountry = async ( req, res ) => {
    const { country } = req.body;

    if ( !country ) {
        return res.status( 400 ).json( { message: 'Country is required' } );
    }

    try {
        req.user.country = country;
        await req.user.save();
        res.json( { message: 'Country updated successfully', country } );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};
