//establish cartItemTemplate
var cartItemTemplate = {
  'menuItem' : {},
  'options' : {}
  'quantity' : 0,
  'price' : 0.00
}
//add an item to the cart
function addCartItem(menuItem, options, quantity) {
  //before we can change the cartItem state we need to build the new cart item
  let cI = {
    'uid' : null,
    'menuItem' : menuItem,
    'options' : options,
    'quantity' : quantity
  }
  //call the hash function
  assignHash(cI);
  //change state
  cart.items.push(cI);
  //change price to reflect new total
  adjustTotal(cI.menuItem.price, quantity);
  //adjust inventory to new total
  adjustInventory(inventory[cI.menuItem.label], quantity);
  //render new data to cart
  render();
}
function removeCartItem(i) {
  //change state
  let cI = removeAtIndex(cart.items, i);
  //change price to reflect new total
  adjustTotal(-1*(cI.menuItem.price), quantity);
  //adjust inventory to new total
  adjustInventory(-1*(inventory[cI.menuItem.label]), quantity);
  //render new data to cart
  render();
}
