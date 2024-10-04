const checkUser = (req, res, next) => {
    const user = req.username;

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }
    next();
};
module.exports = checkUser;