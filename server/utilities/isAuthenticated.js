module.exports = function(req, res, next) {
  console.log('Authenticator');

  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).json({
      success: 'false'
    });
  }
};
