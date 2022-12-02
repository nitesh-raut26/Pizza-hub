const express=require('express')

const app=express();
const ejs=require('ejs')
const path=require('path')
const expressLayout=require('express-ejs-layouts')


const PORT=process.env.PORT||3000


//Assests check 
app.use(express.static('public'));
// app.use(favicon(path.join(__dirname,'public','favicon.ico')));


app.get('/',(req,res)=>
{
    // res.send('Hello from server')
    // we have to render
    res.render('home')
})

// set template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'resources/views'))
app.set('view engine','ejs')

app.listen(PORT ,() => {
  console.log(`listening on port ${PORT}`)
})