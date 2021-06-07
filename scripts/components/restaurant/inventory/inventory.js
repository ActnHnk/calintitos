  var inventory = {
  'taco': 10,
  'burrito': 5,
  'ceviche': 15
}
function adjustInventory(label, value) {
  //uses json to reduce the inventory attribute by one
  inventory[label] += value;
}
