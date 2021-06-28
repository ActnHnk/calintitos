//this function needs to tell the customer if 86
//push the passed json obj (the cartItem) to the array of cartItems
// look up the ordered items' prices and add them to tabCart,
const restarauntCart = 'restaraunt-cart';
class RestarauntCart extends KoiComponent {
  get cartItems() {
    return this._cartItems;
  }
  set cartItems(e) {
    this._cartItems = e;
  }
  constructor() {
    super();
    this.cartItems = [];
    this.tag = restarauntCart;
    this.template.innerHTML = `
      <style>
      </style>
    `;
    this.initialize(this.tag, this.template);
    this.selectElements();
    this.render();
  }
  connectedCallback() {
    //this tells the browser to render the contents and not the wrapper for accessibility reasons
    this.initialize();
    let cart = this.createElement('div','cart');
    for (let cartItem of this.cartItems) {
      //create elements we need to make cartItems
      let cartItemElement = this.createElement('div','cartItem');
      let cartItemTextElement = this.createElement('div','cartItem-text');
      let cartItemLabelElement = this.createElement('div','cartItem-label');
      let cartItemDescElement = this.createElement('div','cartItem-desc');
      let cartItemPriceElement = this.createElement('div','cartItem-price');
      let cartItemPhotoElement = this.createElement('div','cartItem-photo');
      //set cartItem values
      cartItemTextElement.innerHTML=cartItemItem.text;
      cartItemLabelElement.innerHTML=cartItemItem.label;
      cartItemDescElement.innerHTML=cartItemItem.desc;
      cartItemPriceElement.innerHTML=cartItemItem.price;
      cartItemPhotoElement.style.backgroundImage= 'url('+ cartItem.photoUrl +')';
    }
    this.template.appendChild(cart);
    // Initialize shady styles if needed
    this.selectElements();
  }
  selectElements() {
    console.log('Cart Elements Selector is Empty');
  }
  render() {

  }
}
const register_restarauntCart = () => customElements.define(restarauntCart, RestarauntCart);
window.WebComponents ? window.WebComponents.waitFor(register_restarauntCart) : register_restarauntCart();
