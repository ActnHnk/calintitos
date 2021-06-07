function removeAtIndex(m, i) {
  let array = m.splice(i, 1);
  return array[0];
}

function removeByValue(m, v) {
  let index = -1;
  for (let i = 0; i < m.length; i++) {
    if (m[i] == v) {
      index = i;
      break;
    }
  }
  if (index > -1) {
    let array = m.splice(index, 1);
    return array[0];
  }
  else{
    return null;
  }
}

function assignHash(cartItem) {
  let hash = Math.floor(Math.random() * 10);
  cartItem.uid = hash;
}

function yourTab(item) {
  tabCart = tabCart + item.price;
  document.getElementById("yourTab").innerHTML = "your total is $" + tabCart;
}
//
function render86() {
  document.getElementById("cart").value = "Out of Stock :(";
}



function clearAll() {
  document.getElementById("cart").value = ""
  tabCount = 0;

}
