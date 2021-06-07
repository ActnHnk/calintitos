const options = 'menu-options';
//DEFINE HTML ELEMENT CLASSES HERE
class MenuOptions extends KoiComponent {
  constructor() {
    super();
    this.tag = 'menu-options';
    this.quantity = 0;
    this.mod = {};
    this.template.innerHTML = `<style>
      :host {
        --primary: #fff;
  			--secondary: #ccc;
        --light: #0076c0;
  			--medium: #003e7e;
  			--dark: #0f3062;
  			--seraph: Georgia, serif;
  			--sans: Tahoma, Geneva, sans-serif;
  			--direction: row;
  			--mobile-direction: column;
  			--justify: space-around;
  			width: 100%;
      }

    </style>
  	<div></div>`;
  }
  selectElements(){

  }
}
//<menu-options></menu-options>
const register_options = () => customElements.define(options, MenuOptions);
window.WebComponents ? window.WebComponents.waitFor(register_options) : register_options();
