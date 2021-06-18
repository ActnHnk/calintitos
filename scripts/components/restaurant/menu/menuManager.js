const menuManager = 'menu-manager';
class MenuManager extends KoiComponent {
  constructor() {
    super();
    this.tag = 'menu-manager';
    this.template.innerHTML = `
        <script>
          input{
            font-size:24px;
            width: 300px;
        }
        </script>
        <div class="menu-builder">
          <form class="menu-item-generator" id="menu-item-generator">
              <input id="label" value="label" onkeyup="this.getRootNode().host.updateTempLabel(this.value)"></input>
              <input id="description" value="description" onkeyup="this.getRootNode().host.updateTempDescription(this.value)"></input>
              <input id="photoUrl" value="photoUrl" onkeyup="this.getRootNode().host.updateTempPhotoUrl(this.value)"></input>
              <input id="price" value="price" onkeyup="this.getRootNode().host.updateTempPrice(this.value)"></input>
          </form>
        </div>`;
    // let tempObject = {
    //         'photoUrl':'` + this.tempPhotoURL + `',
    //         'label': '` + this.tempLabel + `',
    //         'price': '` + this.tempPrice + `',
    //         'mod': "",
    //         'glutenFree': true,
    //         'description':'` + this.tempDescription + `'
    //       };
    this.template.innerHTML += `<button onclick="this.getRootNode().host.addMenuItem(this.getRootNode().host.menuItems)">submit</button>`;
  }
  connectedCallback(){
    this.initialize();
    //STATE
    this.parent = this.getRootNode().host;
  }
  //// END this is just becauze we have to ////
  //// POLYFILL HELPER ////
  //// WRAPPERS ////
  //LOCAl
  updateTempLabel(value) {
    this.tempLabel = value;
  }
  updateTempDescription(value) {
    this.tempDescription = value;
  }
  updateTempPhotoUrl(value) {
    this.tempPhotoUrl = value;
  }
  updateTempPrice(value) {
    this.tempPrice = value;
  }
  render(menuItems) {
    console.log(menuItems);
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
    return htmlString;
  }
  removeMenuItem(m, i) {
    //change state
    removeAtIndex(m, i);
    //re-render
    this.parent.render();
  }
  addMenuItem() {
    let m = {
      'photoUrl': this.tempPhotoURL,
      'label': this.tempLabel,
      'price': this.tempPrice,
      'mod': "",
      'glutenFree': true,
      'description': this.tempDescription
    };
    //change state
    this.parent.menuItems.push(m);
    //re-render state
    this.parent.render(this.menuItems);
  }
}
const register_menuManager = () => customElements.define(menuManager, MenuManager);
window.WebComponents ? window.WebComponents.waitFor(register_menuManager) : register_menuManager();
