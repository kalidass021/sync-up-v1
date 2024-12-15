import User from '../models/User.js';
import error from '../utils/error.js';

export const getUserProfile = async (req, res, next) => {
    try {
        const {username} = req.params;

        const user = await User.findOne({username}).select('-password');
        if (!user) {
            return next(error(404, `${username} not found`));
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(`Error while fetching user profile ${err.message}`);
        next(err);
    }
}