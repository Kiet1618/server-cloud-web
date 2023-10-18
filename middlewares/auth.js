const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('./asyncErrorHandler');

exports.isAuthenticatedUser = asyncErrorHandler(async (req, res, next) => {

    //remove 'Bearer ' from token "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmRlOTA0NzY5YTY1NmI5ZWJhYTBiNCIsImlhdCI6MTY5NzYzOTYxNywiZXhwIjoxNjk4MjQ0NDE3fQ.RDy1AJjWnQrb6a0m1Wr0v80VPxszGs7qS9SDXAqDooo" 
    const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
    console.log(token)
    if (!token) {
        return next(new ErrorHandler("Please Login to Access", 401))
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();

});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {

        // if (!roles.includes(req.user.role)) {
        //     return next(new ErrorHandler(`Role: ${req.user.role} is not allowed`, 403));
        // }
        next();
    }
}