import jwt from 'jsonwebtoken'

// generate token by id you passed
// token used for go to private route
// if !token => you can't access that route
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '2h'
  })
}

export default generateToken