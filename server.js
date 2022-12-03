require('dotenv').config()
const express=require('express')
const app=express();
const ejs=require('ejs')
const path=require('path')
const expressLayout=require('express-ejs-layouts')
const PORT=process.env.PORT||3000
const mongoose=require('mongoose')
const session=require('express-session')
const flash=require('express-flash')
const MongoDbStore=require('connect-mongo')(session)

//Database connection
const url='mongodb://localhost/pizza';
mongoose.connect(url,{ useNewUrlParser:true, useUnifiedTopology: true}).catch((err) => {
    console.error(err.message); //Handles initial connection errors
    process.exit(1); // Exit process with failure
  });
const connection=mongoose.connection;
connection.once('open',() => {
  console.log('Database connected...');
})
connection.on('error', () => {
    console.log('> error occurred from the database');
  });


  // Session store
let mongoStore= new MongoDbStore({
  mongooseConnection: connection,
  collection: 'sessions'
         })

// session config works as a middleware
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store:  mongoStore,
  saveUninitialized: false,
  cookie: {maxAge:1000 * 60 * 60 *24}//24 hrs //it is in ms
}))



app.use(flash())

//Assests check 
app.use(express.static('public'));
// app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.use(express.json())

// global middleware
app.use((req,res,next)=>{
     res.locals.session=req.session
     next()
})


// set template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'resources/views'))
app.set('view engine','ejs')


require('./routes/web')(app)

app.listen(PORT ,() => {
  console.log(`listening on port ${PORT}`)
})