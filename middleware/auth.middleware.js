const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {

  

  if (req.method === 'OPTIONS') {
    return next();
  }

  //console.log('req in auth.middleware: ', req.headers.authorization);

  try {
    // console.log('token: ', req.hraders.authorization);
    const token = req.headers.authorization.split(' ')[1]; // "Bearer token"

    if (!token) {
      //console.log('token: ', token);
      // чтобы код дальше не выполнялся - return
      return res.status(401).json({ message: 'Нет авторизации' });
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Нет авторизации' });
  }
}