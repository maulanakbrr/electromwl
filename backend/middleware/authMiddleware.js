// authorization using token, jwt

import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// create protect function
// read req.headers.authorization and check
// req.headers.authorization starts with 'Bearer'
// if its true, get token by split the req.headers.authorization
// verify the token and save on decoded var
// get req.user datas by find user by id excepet password
export const protect = asyncHandler(async (req, res, next) => {
  let token

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  // if token doesn't exists
  // throw error
  if(!token){
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

