import jwt from 'jsonwebtoken';

let verifyToken = (req, res, next) => {
  const token = req.get('Authorization') || req.session.token;
  if (!token) return res.sendStatus(401)
  try {
    const verified = jwt.verify(token, process.env.SECRET)
    req.user = verified
    next()
  }
  catch (err) {
    console.log(err)
    return res.sendStatus(403)
  }
}

module.exports = {
  verifyToken
}