//DEFINE CONSTANTS HERE
const footer = 'koi-footer';
//DEFINE HTML ELEMENT CLASSES HERE
class KoiFooter extends KoiComponent {
  constructor() {
    super();
    this.tag = 'koi-footer';
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
        font-family: var(--sans);
        width: 100%;
      }
      footer {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        align-items: center;
        background-color: black(--light);
        color: #555(--primary);
        font-weight: 600;
        font-size: 20px;
        padding-left: 300x;
        padding-right: 100px;
        width: 100%;
      }
      footer img {
          max-width: 200px;
      }
      .footerLeft {
        margin: 40px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 500px;
      }
      @media only screen and (max-width: 905px) {
        .footerLeft {
          width: 100%;
          justify-content: space-between;
        }
      }
      @media only screen and (max-width:575px) {
        .footerLeft {
          margin-left: 10px;
          margin-right: 10px;
        }
      }
      @media only screen and (max-width:515px) {
        .footerLeft {
          justify-content: center;

        }
      }
    </style>
    <footer class="footer">
      <small class="footer"> <img class="dib" src="/images/logo.jpg" alt="Logo" width="15" height="15">WELCOME TO MOES <img class="dib" src="/images/logo.jpg" alt="Logo" width="15" height="15"> </small>
    </footer>
    <script>
      lightbox.option({
        'fitImagesInViewport': true,
        'wrapAround': true,
        'maxHeight': 600,
        'maxWidth': 900
      })
    </script>
    <script type="text/javascript" src="/scripts/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="/scripts/slick.min.js"></script>


    <div id="lightboxOverlay" class="lightboxOverlay" style="display: none;"></div>
    <div id="lightbox" class="lightbox" style="display: none;">
      <div class="lb-outerContainer">
        <div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">
          <div class="lb-nav"><a class="lb-prev" href="https://annasisters.org/"></a><a class="lb-next" href="https://annasisters.org/"></a></div>
          <div class="lb-loader"><a class="lb-cancel"></a></div>
        </div>
      </div>
      <div class="lb-dataContainer">
        <div class="lb-data">
          <div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div>
          <div class="lb-closeContainer"><a class="lb-close"></a></div>
        </div>
      </div>
    </div>

    </footer>
  `;
  }
  selectElements() {
    this.shadowFooter = this.shadowRoot.getElementById('kfooter');
    this.shadowLogo = this.shadowRoot.getElementById('klogo');
  }
}

const register_footer = () => customElements.define(footer, KoiFooter);
window.WebComponents ? window.WebComponents.waitFor(register_footer) : register_footer();
