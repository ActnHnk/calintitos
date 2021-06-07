//cart template
var cart = {
  'items' : [],
  'total' : 0.00
}

function renderCart() {
    let htmlString;
  for(let menuItem of menuItems)
  {
  htmlString += "<div>"+menuItem.price+" "+menuItem.label +"</div>"
  }
  document.getElementById("cart").innerHTML = htmlString;

}

function adjustTotal(price, quantity) {
  cart.total += price;
  renderCart();
}
//this function needs to tell the customer if 86
//push the passed json obj (the cartItem) to the array of cartItems
// look up the ordered items' prices and add them to tabCart,
