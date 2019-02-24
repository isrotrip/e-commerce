# e-commerce

Route | HTTP | Header(s) | Body | Response | Description
------|------|-----------|------|----------|------------
/customers/login|POST||email:String(**Required**)<br>password:String(**Required**)|error:<br>Wrong username/password<br>success:<br>login success|login to the website
/customers/register|POST||name:String(**Required**)<br>email:String(**Required**)<br>password:String(**Required**)|error:<br>email have been registered<br>success:<br>customers have been login successfully|register to the web
/customers/topup|POST|token:String(**Required**)|amount:Number(**Required**)<br>customerId:String(**Required**)|error:<br>minimum topup 20000<br>success:<br>topup success|for top up money
/items/addToCart|POST|token:String(**Required**)|itemId:String(**Required**)<br>amount:Number(**Required**)|error:<br>insufficient money<br>success:<br>success add item to the cart|add item to the cart
/items/readCart|GET|token:String(**Required**)||error:<br>internal server error<br>success:<br>show the list|view all items in cart
/items/editCart|PUT|token:String(**Required**) <br> itemId:String(**Required**)||error:<br>not authorized to edit items<br>success:<br>edit item success|edit items in cart
/items/removeFromCart|DELETE|token:String(**Required**) <br> itemId:String(**Required**)||error:<br>not authorized to remove items<br>success:<br>remove item success|remove items in cart