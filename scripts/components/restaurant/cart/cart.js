//cart template
var cart = {
  'items' : [],
  'total' : 0.00
}
function adjustTotal(price, quantity) {
  cart.total += price;
  render();
}
//this function needs to tell the customer if 86
//push the passed json obj (the cartItem) to the array of cartItems
// look up the ordered items' prices and add them to tabCart,
