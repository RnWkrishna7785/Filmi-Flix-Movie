import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { validateRegisterInput, validateLoginInput } from '../utils/validation.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const { valid, errors } = validateRegisterInput(name, email, password);
    if (!valid) {
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already registered with this email address' });
    }

  
    const user = await User.create({
      name,
      email,
      password,
      role: 'user',
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        favorites: user.favorites,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { valid, errors } = validateLoginInput(email, password);
    if (!valid) {
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }

    const user = await User.findOne({ email });
    
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      
      return res.json({
        success: true,
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          favorites: user.favorites,
        },
      });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    return next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    if (user) {
      return res.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          favorites: user.favorites,
        },
      });
    } else {
      return res.status(404).json({ success: false, message: 'User profile not found' });
    }
  } catch (error) {
    return next(error);
  }
};
