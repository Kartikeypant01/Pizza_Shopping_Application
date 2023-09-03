// Products CRUD Operation
// C- create , R -read , U-update , D-delete


import makeNetworkCall from './api_client.js'
import {URL} from '../utils/config.js'
import Pizza from '../models/Pizza_Model.js'

const Pizza_Operation ={
    pizzas:[],
    searchPizza(pizzaid){
        const pizzaObject = this.pizzas.find((pizza)=>pizza.id==pizzaid);
        pizzaObject.isAddedInCart = true;
    

    },

 async getPizzas(){
    //API Client(objects (Pizza))
    const data = await makeNetworkCall(URL);
    const pizzaJSON = data['Vegetarian'];
    const pizzas =pizzaJSON.map(singlePizza =>{
        const pizzaObject = new Pizza(singlePizza.id,singlePizza.name,singlePizza.price,singlePizza.assets.product_details_page[0].url,singlePizza.menu_description);
        return pizzaObject;
    });
    this.pizzas=pizzas;
    return pizzas;
    //Data Map To Model
    //Return Model
}
}
export default Pizza_Operation;