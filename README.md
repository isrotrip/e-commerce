# e-commerce

Route | HTTP | Header(s) | Body | Response | Description
------|------|-----------|------|----------|------------
/customers/login|POST||email:String(**Required**)<br>password:String(**Required**)|error:<br>Wrong username/password<br>success:<br>login success|login to the website
/customers/register|POST||name:String(**Required**)<br>email:String(**Required**)<br>password:String(**Required**)|error:<br>email have been registered<br>success:<br>customers have been login successfully|register to the web
/items|POST|token:String(**Required**)|name:String(**Required**)<br>amount:Number(**Required**) price:Number(**Required**) picture:File(**Required**)|error:<br>insufficient money<br>success:<br>success add item to the cart|add item to the cart
/items|GET|token:String(**Required**)||error:<br>internal server error<br>success:<br>show the list|view all items in cart
/items/:id|PUT|token:String(**Required**) <br> itemId:String(**Required**)|token:String(**Required**)|name:String(**Required**)<br>amount:Number(**Required**) price:Number(**Required**) picture:File(**Required**)|error:<br>not authorized to edit items<br>success:<br>edit item success|edit items in cart
/items/:id|DELETE|token:String(**Required**) <br> itemId:String(**Required**)||error:<br>not authorized to remove items<br>success:<br>remove item success|remove items in cart
/cart | GET | token:String(**Required**) | | error:<br> please login first<br> success:<br> successfully read data | get products from api
/cart | POST | token:String(**Required**) | itemId:String(**Required**) <br> cartId:String(**Required**) <br> amount:Number (**Required**) | error: <br> amount must between 1 into maksimum stock | Add item into cart
/cart/:id/:itemId | PUT | token:String(**Required**) | qty:Number(**Required**) | error: <br> amount must between 1 into maksimum stock <br> can't update other customers data <br> success: update item amount | edit item in the cart
/cart/:id/:itemId | DELETE | token:String(**Required**) | | error: <br> can't delete other customers data <br> success: <br> successfully delete data from cart | delete item from the cart

### Usage
command |
------- |
$ npm install |
$ npm run start from server dist |
$ npm run serve |

Access the Server via http://localhost:3000/
<br>
Access the Client via http://localhost:8080/