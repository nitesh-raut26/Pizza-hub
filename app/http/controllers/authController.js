const User=require('../../models/user')
const bcrypt=require('bcrypt');
const passport =require('passport')


function authController(){
    return{
       login(req,res){
            res.render('auth/login');
        },
        postLogin(req,res,next){

            const {email, password} = req.body
            // validate request
            if(!email||!password)
            {
                req.flash('error','All fields are required')    
                return res.redirect('/login')
            }
           
            // strategy use local so i wrote local
          passport.authenticate('local',(err,user,info)=>{
            if(err){
                req.flash('error',info.message)
                return next(err)
            }
            if(!user){
                req.flash('error',info.message)
                return res.redirect('/login')
            }
            req.logIn(user,(err)=>{
                if(err){
                    req.flash('error',info.message)
                    return next(err)
                }

                 return res.redirect('/')

            })

          })(req,res,next)
        },


        register(req,res){
            res.render('auth/register');
        },
       async postRegister(req,res){
            const { name, email, password} = req.body
            // validate request
            if(!name||!email||!password)
            {
                req.flash('error','All fields are required')
                req.flash('name',name)
                req.flash('email',email)
                return res.redirect('/register')
            }
           
            // check if email exists
            User.exists({email: email},(err,result)=>
            {
                if(result)
                {
                req.flash('error','Email already taken')
                req.flash('name',name)
                req.flash('email',email)
                return res.redirect('/register')
                }
            })
           
            //  we couldn't create a password as open to store in database so we have to used hash password 
            // so we have to used libraries npm install bcrypt
            // Hash password
            const hashPassword=await bcrypt.hash(password,10)

            // create a user to make model so it is written as User
            const user=new User({
                name:name,
                email:email,
                password: hashPassword
            })
            
            user.save().then((user)=>{
                //login part
                return res.redirect('/') 


            }).catch(err=>{
                req.flash('error','Something went wrong')
                return res.redirect('/register')
            })


            // console.log(req.body)
            // so now user database to store in database req.body stored about user detail
            // so we have to created collection in model and model have menu.js


        },
        logout(req,res,next){
            req.logout(function(err){
                if (err) { return next(err); }
                  return res.redirect('/login');
            })          
        }

    }
}
module.exports=authController
