import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// build user schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
})

// build methods for match password when log in
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// build pre method (pre 'save')
// it's active when you want to save something
// used for hash password
// not gonna used when your password not modified (when you update name/email)
userSchema.pre('save', async function (next) {
  if(!this.isModified('password')){
    next()
  }
  
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

//  create user model
const User = mongoose.model('User', userSchema)

export default User

