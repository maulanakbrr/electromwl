import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// auth user and get token - public
// if user exists and user password matches with entered password
// then send json
export const authUser = asyncHandler( async(req, res) => {
  const { email, password } = req.body
  
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))){
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// register a new user - public
// check if user exists
// if its true, send status 400 and error
// create user then send status 201 and json data
export const registerUser = asyncHandler( async(req, res) => {
  const { name, email, password } = req.body
  
  const userExists = await User.findOne({ email })

  if (userExists){
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password
  })

  if (user){
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// get user profile - private
// find user by req.user._id
export const getUserProfile = asyncHandler( async(req, res) => {
  const user = await User.findById(req.user._id)

  if (user){
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin 
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})