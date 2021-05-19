var tabCart = 0;
  var menuItems = [];
var taco = {
  'id': 'taco',
  'price': 3,
  'inventory': 10,
  'mod': "",
  'glutenFree' : true,
  'uniqueIdentifier' : 1
};
var burrito = {
  'id': 'burrito',
  'price': 6,
  'shell': 'soft',
  'inventory': 1,
  'mod': "",
  'glutenFree' : false,
  'uniqueIdentifier' : 0
};

function generateHash(menuItem){
let hash = Math.floor( Math.random()*10);
menuItem.uniqueIdentifier = hash;
}

//this function takes an array and a json obj get passed
function removeItem(menuItems, menuItem){
  let result;
  let item = menuItems.find((element, index, array) => {
    result = {
      'index': index
    };
  });
  menuItems.splice(result, 1);
if(tabCart >= 0 ){
  tabReduce(menuItem);
 increaseInventory(menuItem);
  renderOrder();
}
  else
  {
    renderOrder();
  }
};
//this function needs to tell the customer if 86
//push the passed json obj (the menuItem) to the array of menuItems
// look up the ordered items' prices and add them to tabCart,
//render the item on the screen
function addItem(menuItem){
  if (menuItem.inventory == 0) {
    render86();
  } else {
    menuItems.push(menuItem);
    decreaseInventory(menuItem);
    yourTab(menuItem);
    renderOrder();
    generateHash(menuItem);
  }
}

//
function tabReduce(item){
  tabCart = tabCart - item.price;
  if(tabCart<=0){
    document.getElementById("yourTab").innerHTML = "your total is $" + 0;
  }
  else{
  document.getElementById("yourTab").innerHTML = "your total is $" + tabCart
}
}


function yourTab(item){
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
function increaseInventory(orderedItem) {
  //uses json to reduce the inventory attribute by one
  orderedItem.inventory += 1;

}


function decreaseInventory(orderedItem) {
  //uses json to reduce the inventory attribute by one
  orderedItem.inventory -=1;

}

function sendItem() {
  //sends the order to a database

}

function modOrder(foodMod){
window.open("https://www.w3schools.com");
}

function clearAll(){
document.getElementById("demo").value = ""
tabCount = 0;

}
function CanIeat(menuItem){
let canI;
canI = menuItem.glutenFree;
document.getElementById("demo").value=CanI;
}
