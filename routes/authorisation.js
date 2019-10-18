//Our custom middleware function.
module.exports = options => (req, res, next) => {
  let redirectUrl = options ? options : "/";

  // After initialising passport we have access to the .isAuthenticated method.
  // This method will return true or false.
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect(redirectUrl);
  }
};
