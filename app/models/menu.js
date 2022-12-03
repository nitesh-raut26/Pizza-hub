// menu is singular and in database is written in plural so it name is menu
const mongoose=require('mongoose')
const Schema =mongoose.Schema

// it  is the blueprint of model
const menuSchema=new Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    size:{type:String,required:true}
})
// from blueprint we create model
// in database create a we create Menu then it show in database Menus
// const Menu=mongoose.model('Menu',menuSchema)

module.exports=mongoose.model('Menu',menuSchema)