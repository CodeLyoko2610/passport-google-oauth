const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/User')

//Serialize using user id
passport.serializeUser((user, done) => {
  done(null, user.id)
})

//Retrieve user using user id
passport.deserializeUser(async (id, done)=>{
  const user = await User.findById({id})
  done(null, user)
})

passport.use(new GoogleStrategy({
  //options for GoogleStrategy
  callbackURL: '/auth/google/redirect',
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret, 
}, async (accessToken, refreshToken, profile, done) => {  
  console.log('Passport callback fired!')

  //Check if user exists
  const currentUser = await User.findOne({googleId: profile.id})
  
  if(currentUser){
    console.log('Welcome back: ', currentUser)
    done(null, currentUser) //go to next stage
  } else {
    //Create new user object and store in db
  const newUser = new User({
    username: profile.displayName,
    googleId: profile.id,
  })
  await newUser.save()

  console.log('New user created: ', newUser)
  done(null, newUser) //go to next stage
  }
}
))