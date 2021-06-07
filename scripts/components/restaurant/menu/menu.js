let menuItemTemplate = {
  'photoURL': '',
  'label': '',
  'price': 0,
  'mod': "",
  'glutenFree': false,
  'description': ''
}
//put all menu items into menuItem array for front-end
var menuItems = [farmer, taco, ceviche, burrito];

const restarauntMenu = 'restaraunt-menu';
class RestarauntMenu extends KoiComponent {
  get tempLabel() {
    return this._tempLabel;
  }
  set tempLabel(e) {
    this._tempLabel = e;
  }
  get tempDescription() {
    return this._tempDescription;
  }
  set tempDescription(e) {
    this._tempDescription = e;
  }
  get tempPhotoUrl() {
    return this._tempPhotoUrl;
  }
  set tempPhotoUrl(e) {
    this._tempPhotoUrl = e;
  }
  get tempPrice() {
    return this._tempPrice;
  }
  set tempPrice(e) {
    this._tempPrice = e;
  }

  constructor() {
    super();
    this.tag = restarauntMenu;
    this.template.innerHTML = `
    <style>
    button{
      background-color:red;
    }

    .description{
      font-size:12px;
    }
    .thumbnail-container{
      height:100%;
      width:100px;
      background-position: center;
      background-size: cover;
    }
    .menu-text{
      max-width:200px;
     display: flex;
     flex-direction: column;
     justify-content: space-between;
    }
    .menu {
      justify-content: center;
          display: flex;
          flex-wrap: wrap;
     }
     .menu-item{
       margin: 5px;
       max-width: 300px;
       display: flex;
       border: dashed 1px grey;
       font-size: 20px;
     }
    img {
  border: 1px solid #ddd; /* Gray border */
  border-radius: 4px;  /* Rounded border */
  padding: 5px; /* Some padding */
  width: 150px; /* Set a small width */
}

/* Add a hover effect (blue shadow) */
button:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}

    </style>
    <div id="menu" class="menu">
          <!-- menu items load here-->

      </div>
<menu-manager></menu-manager>
`;
    this.initialize(this.tag, this.template);
    this.selectElements();
    this.render();
  }
  selectElements() {
    this.shadowMenu = this.shadowRoot.getElementById('menu');
  }


  render() {
    let htmlString = "";
    for (let menuItem of menuItems) {
      htmlString += `
    <div class="menu-item" id="menu-item">
      <div class="menu-text" id="menu-text">
        <div class="label" id="label">` + menuItem.label + `</div>
        <div class="description" id="description">` + menuItem.description + `</div>
        <div class="price" id="price">$` + menuItem.price + `</div>
      </div>
      <div class="thumbnail-container" id="thumbnail-container" style = "background-image:url(` + menuItem.photoUrl + `)"></div>

      </div>`;
    }
    this.shadowMenu.innerHTML = htmlString;

  }
}
const register_restarauntMenu = () => customElements.define(restarauntMenu, RestarauntMenu);
window.WebComponents ? window.WebComponents.waitFor(register_restarauntMenu) : register_restarauntMenu();
