const mongoose=require('mongoose')
const Schema =mongoose.Schema

// it  is the blueprint of model
const userSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true, unique:true},
    password:{type:String,required:true},
    role: {type:String,default:'customer'}
 }, {timestamps: true

})
// from blueprint we create model
// in database create a we create Menu then it show in database Menus
// const Menu=mongoose.model('Menu',menuSchema)

// model is singular i.e User and in database name stored is in plural i.e Users
module.exports=mongoose.model('User',userSchema)