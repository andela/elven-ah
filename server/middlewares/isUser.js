// only the owner of the request can make changes to the article

const isUser = (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({
      status: 403,
      success: 'false',
      message: 'Access Denied, You don\'t have the permission',
    });
  }
  return next();
};
export default isUser;
