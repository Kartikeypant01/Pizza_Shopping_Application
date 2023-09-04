// Glue btwn View and Model
// Controller UI I/O

import pizzaOperations from '../services/Pizza_Operation.js'



async function printPizzas(){
    const allPizzas= await pizzaOperations.getPizzas();
    const div  =document.getElementById('pizza-output');
    
    
    console.log('All Pizza',allPizzas);
    for(var pizza of allPizzas){
        const card = createCard(pizza);
        div.appendChild(card);
       
    }
}
printPizzas();
function printBasket(){
    const basketDiv = document.getElementById("basket");
    basketDiv.innerHTML ="";
    const pizzaInCart =pizzaOperations.pizzas.filter(
        (pizza)=>pizza.isAddedInCart == true
    );
    console.log(pizzaOperations.pizzas);
    pizzaInCart.forEach((pizza)=>{
        const p =printItem(pizza);
        basketDiv.appendChild(p);
        
    });
    const total = pizzaInCart.reduce((acc,pizza)=>{
        return acc + +pizza.price;
    },0);
    const h2=document.createElement("h2");
    h2.innerText=`Total Amount ${total}`;
    basketDiv.appendChild(h2);

    }
    function printItem(pizza){
    const pTag=document.createElement("p");
    pTag.innerText = `Pizza name : ${pizza.name}`;
    return pTag;
    }


function addToCart(){
    console.log("Add To Cart");
    const currentButton = this;
     const id = currentButton.getAttribute("pizza-id");
     console.log(id);
     pizzaOperations.searchPizza(id);
     printBasket();
}

function createCard(pizza){
    const colDiv = document.createElement('div');
   colDiv.className = 'col-4';
    const cardDiv = document.createElement("div");
    cardDiv.className ="col-4";
    cardDiv.style = {width:'18rem'};
    colDiv.appendChild(cardDiv);

    const img = document.createElement('img');
    img.src = pizza.url;
    img.className = 'card-img-top';
    cardDiv.appendChild(img);

    const cardBody=document.createElement('div');
    cardBody.className='card-body';

    const h5=document.createElement('h5');
    h5.className ='card-title';
    h5.innerText=pizza.name;
    cardBody.appendChild(h5);
    cardDiv.appendChild(cardBody);

    const pTag = document.createElement('p');
    pTag.className  = 'card-text';
    pTag.innerText = pizza.desc;
    cardBody.appendChild(pTag);

    const a = document.createElement('a');
    a.className = "btn btn-primary";
    a.innerText = "Add-To=Cart";
    a.setAttribute("pizza-id",pizza.id);
    a.addEventListener("click",addToCart);   //event bind
    cardBody.appendChild(a);

    return cardDiv;

}