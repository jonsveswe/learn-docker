// A middleware is just a function that runs before your controller. 
const protect = (req, res, next) => {
    const {user} = req.session; // In our case the session have a cookie object and maybe a user object if user logged in. 

    if (!user) {
        return res.status(401).json({status: 'fail', message: 'unauthorized'});
    } 

    // Optional: Do this so we don't need to do req.session.user in ither parts of the code. Only need to do req.user.  
    req.user = user;

    next(); // The next() method will just send it to the controller or the next middleware in the stack. 
};

module.exports = protect;

