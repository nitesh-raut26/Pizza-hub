import axios from 'axios'
import Noty from 'noty'


let addToCart=document.querySelectorAll('.add-to-cart')
let cartCounter =document.querySelector('#cartCounter')

function updatecart(pizza){
    // ajax call 
    // we  use libraries that is used in production market i.e axios
    axios.post('/update-cart',pizza).then(res=>
        {
            cartCounter.innerText = res.data.totalQty
            new Noty({
                type: 'success',
                timeout:1000,
                text: "Items added to Cart",
                progressBar:false,
                // layout:'bottomLeft'
              }).show();
        }).catch(err =>{
            new Noty({
                type: 'error',
                timeout:1000,
                text: "Something went wrong",
                progressBar:false,
                // layout:'bottomLeft'
              }).show();
        })

}

addToCart.forEach((btn) => {
    btn.addEventListener('click',(e)=>{
       
        // as pizza is name in data attribute as iit gives string so it is to be converted to object
        // let pizza=btn.dataset.pizza;
         let pizza=JSON.parse(btn.dataset.pizza)
         updatecart(pizza)
        // console.log(pizza);
    })
})