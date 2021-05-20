function removeAtIndex(m, i){
  let array =  m.splice(i, 1);
  return array[0];
}
function assignHash(cartItem){
  let hash = Math.floor( Math.random()*10);
  cartItem.uid = hash;
}
function yourTab(item) {
  tabCart = tabCart + item.price;
  document.getElementById("yourTab").innerHTML = "your total is $" + tabCart;
}
//
function render86() {
  document.getElementById("demo").value = "Out of Stock :(";
}
function renderOrder() {
  document.getElementById("demo").value = JSON.stringify(menuItems);
}
function clearAll() {
  document.getElementById("demo").value = ""
  tabCount = 0;

}
