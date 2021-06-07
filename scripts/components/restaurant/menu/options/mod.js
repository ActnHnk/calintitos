var allergens = {"gluten": true, "dairy":true, "soy":true, "shellfish":true, "nuts":true};
const mod = 'menu-mod';
//DEFINE HTML ELEMENT CLASSES HERE
class MenuMod extends KoiComponent {
  constructor() {
    super();
    this.tag = 'menu-mod';
    this.modifiers = [];
    this.label = "";
    this.template.innerHTML = `
    <style>
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
  //this is what an admin will be doing when they add or remove things
  addMod(string){
this.modifiers.push(string);
  }
  removeMod(string){
let removedItem = removeByValue(this.modifiers, string);
console.log(removedItem);
  }
}
//<menu-mod></menu-mod>
const register_mod = () => customElements.define(mod, MenuMod);
window.WebComponents ? window.WebComponents.waitFor(register_mod) : register_mod();
