import jwt from 'jsonwebtoken';
import userModel from '../models/userModules.js';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized. Access token is missing.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, message: 'Unauthorized. Invalid access token.' });
        }
        req.user = { id: user._id };
        
        next();
    } catch (error) {
        console.error('Authentication Error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
export default authMiddleware;
