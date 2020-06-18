const router = require('express').Router()
const passport = require('passport')
const passportSetup = require('../config/passport-setup')

//GET /auth/login
router.get('/login', (req,res)=>{
  res.render('login')
})

//GET /auth/google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))

//GET /auth/google/redirect
router.get('/google/redirect', passport.authenticate('google') ,(req, res)=>{
  res.send(req.user)
})

//GET /auth/logout
router.get('/logout', (req, res)=>{
  //handle with passport
  res.send('Logout')
})


module.exports = router