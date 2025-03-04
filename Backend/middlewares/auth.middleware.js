const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        req.user = user;

        return next();

    }catch(err){
        return res.status(401).json({ message: 'Unauthorized' });
    }
}    


module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const captain = await captainModel.findById(decoded.id); // Correct model
      if (!captain) {
        return res.status(404).json({ message: 'Captain not found' });
      }
  
      req.captain = captain; // Set captain in request
      next(); // Pass control to the next middleware/handler
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
  