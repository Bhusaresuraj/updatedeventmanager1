import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Use environment variables for these values
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
}; 