// database fetch
const Menu=require('../../models/menu')

function homeController(){
    // factory function
    // closure
    return{
        // crud operation means create,read,update and delete to be put into different method i.e called crud operation
        // if we use read then we use index method
        //  index: function() it can be wriiten as index()
        async index(req,res){
            // any name in function can be written 
        //     Menu.find().then(function(pizzas){
        //         console.log(pizzas);
        //     return  res.render('home',{ pizzas: pizzas})
        // })
         const pizzas= await Menu.find()
         console.log(pizzas);
         return  res.render('home',{ pizzas: pizzas})
    }
}
}
module.exports=homeController
