const isAuthenticated = (req, res, next) => {
  console.log('is authenticated');

  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).json({
      success: false
    });
  }
};

const isAuthorizedUser = (req, res, next) => {
  console.log('is authorized user');

  if (!req.isAuthenticated())
    return res.status(401).json({ authorized: false });

  const sessionUser = req.user;

  if (sessionUser.role_id === 1) return next();
  if (!sessionUser.verified) return res.status(401).json({ authorized: false });

  const { id } = req.params; // user id

  return new User()
    .where({ id })
    .fetch()
    .then(user => {
      const { id } = user;

      if (id !== sessionUser.id)
        return res.status(401).json({ authorized: false });
      next();
    });
};

const isAuthorizedItem = (req, res, next) => {
  console.log('is authorized item');

  if (!req.isAuthenticated())
    return res.status(401).json({ authorized: false });

  const sessionUser = req.user;

  if (sessionUser.role_id === 1) return next();

  const { id } = req.params; //item id

  return new Item()
    .where({ id })
    .fetch()
    .then(item => {
      const { owner } = item;
      if (owner !== sessionUser.id)
        return res.status(401).json({ authorized: false });
      next();
    });
};

module.exports = {
  isAuthenticated: isAuthenticated,
  isAuthorizedUser: isAuthorizedUser,
  isAuthorizedItem: isAuthorizedItem
};
