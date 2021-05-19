//DEFINE CONSTANTS HERE
const header = 'koi-header';
//DEFINE HTML ELEMENT CLASSES HERE
class KoiHeader extends KoiComponent {
  constructor() {
    super();
    this.tag = 'koi-header';
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

      .kheader{
        display: flex;
        flex-direction: column;
        min-height: 150px;
        background-color:black;
        background-repeat: no-repeat;
        background-position: top;
        background-size: cover;
        background-attachment: fixed;
        color: white;
        justify-content: space-around;
        flex-wrap: wrap;
        align-content: center;
        align-items: center;
      }
      @media only screen and (max-width: 700px) {
        .alert{
          flex-direction: column;
          align-items: center;
          font-size: 20px;
          font-weight: 600;
        }

      }
      @media only screen and (max-width: 500px) {
        .kheader{
          flex-wrap:wrap;
        }
        .klogoContainer{
          width:100%;
        }
      }
  		@media only screen and (max-width: 455px) {
  			:host{
  				width: 100%;
  			}
  			.kheader{
  				width: 100%;
  			}
  			.klogo{
  				max-width:100%;
  			}
        .roleItems{
          padding-left:20px;
        }

  			.klogoContainer{
      		margin-top: 10px;
  			}}
    </style>
  	<header id="kheader" class="kheader" name="kheader">
<slot name="title">CalinTitos</slot>
  		<koi-nav></koi-nav>
    </header>`;
  }
  selectElements(){
    this.shadowHeader = this.shadowRoot.getElementById('kheader');
    this.shadowLogo = this.shadowRoot.getElementById('klogo');
  }
}
//<koi-header></koi-header>
const register_header = () => customElements.define(header, KoiHeader);
window.WebComponents ? window.WebComponents.waitFor(register_header) : register_header();
