let menuItemTemplate = {
  'label': '',
  'price': 0,
  'mod': "",
  'glutenFree': false,
  'description': ''
}
//put all menu items into menuItem array for front-end
var menuItems = [taco, burrito, ceviche];
//add an item to the menu
function addMenuItem(m) {
  //change state
  m.push(menuItems);
  //re-render state
  render();
}

function removeMenuItem(m, i) {
  //change state
  removeAtIndex(m, i);
  //re-render
  render();
}
