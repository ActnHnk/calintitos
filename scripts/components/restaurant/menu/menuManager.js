////////
const menuManager = 'menu-manager';
//KoiComponent - Generic Web Component
//observes state, reqStataus, and respStatus attributes
//nested properties: template, tag, state, reqStataus, and respStatus
//initialize() -
class MenuManager extends KoiComponent {
  //--web native attribute calls--/

  //// temp is our wc html ////
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
        this.template.innerHTML += `<button onclick="this.getRootNode().host.addMenuItem(menuItems)">submit</button>`;
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
  }
  removeMenuItem(m, i) {
    //change state
    removeAtIndex(m, i);
    //re-render
    this.render();
  }
  addMenuItem(menuItems) {
  let m =  {
                'photoUrl': this.tempPhotoURL,
                'label':  this.tempLabel,
                'price':  this.tempPrice,
                'mod': "",
                'glutenFree': true,
                'description': this.tempDescription
              };
    //change state
    menuItems.push(m);
    //re-render state
    this.render(menuItems);
  }
}
const register_menuManager = () => customElements.define(menuManager, MenuManager);
window.WebComponents ? window.WebComponents.waitFor(register_menuManager) : register_menuManager();
