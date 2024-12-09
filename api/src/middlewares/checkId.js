import {isValidObjectId} from 'mongoose';
import error from '../utils/error.js';

// middleware to check, id parameter is valid mongo db objectId or not
const checkId = (req, res, next) => {
    const {id: objectId} = req.params;
    
    if (!isValidObjectId(objectId)) {
        return next(error(404, `Invalid Object: ${objectId}`));
    }
    
    // else call the next function
    next();
}

export default checkId;