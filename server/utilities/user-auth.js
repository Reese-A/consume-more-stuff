const isAuthenticated = (req, res, next) => {
  console.log('Authenticator');

  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).json({
      success: false
    });
  }
};

const isAuthorizedUser = (req, res, next) => {
  if (!req.isAuthenticated()) return res.status(401).json({ success: false });

  const sessionUser = req.user;

  if (sessionUser.role_id === 1) return next();
  if (!sessionUser.verified) return res.status(401).json({ authorized: false });

  const { id } = req.params; // user id

  return new User()
    .where({ id })
    .fetch()
    .then(user => {
      const { id, verified } = user;

      if (id !== sessionUser.id)
        return res.status(401).json({ authorized: false });
      next();
    })
    .catch(err => {
      console.log(err);
      return res.json(err);
    });
};

const isAuthorizedItem = (req, res, next) => {
  if (!req.isAuthenticated()) return res.status(401).json({ success: false });

  const sessionUser = req.user;

  if (sessionUser.role_id === 1) return next();

  const { id } = req.params; // item id

  return new Item()
    .where({ id })
    .fetch()
    .then(item => {});
};

module.exports = {
  isAuthenticated: isAuthenticated,
  isAuthorizedUser: isAuthorizedUser
};
