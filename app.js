const express = require('express')
const authRoutes = require('./routes/auth-routes')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')

const app = express()

//Set view engine
app.set('view engine', 'ejs')

//Set up cookie
app.use(cookieSession({
  maxAge: 24*60*60*1000, //a day in ms
  keys: [keys.session.cookieKey]

}))

//Initialize passport
app.use(passport.initialize())
app.use(passport.session())

//Connect to mongodb
mongoose.connect(keys.mongodb.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, ()=>{
  console.log('Connected to MongoDB...')
})

//Routes
app.use('/auth', authRoutes)

//Home page
app.get('/',(req, res)=>{
  res.render('home')
})

const PORT = 4000
app.listen(PORT, ()=>{
  console.log(`App running on port ${PORT}...`)
})