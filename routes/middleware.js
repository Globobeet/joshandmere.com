module.exports = {
    initLocals(req, res, next) {
        res.locals.user = req.user;
        return next();
    }
};
