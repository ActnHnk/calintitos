const signIn = 'koi-signin';
const signIn_template = document.createElement('template');
signIn_template.innerHTML = `
<form class="simple_form new_user">
  <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
    <legend class="f4 fw6 ph0 mh0">Sign In</legend>
    <div class="mt3">
      <div class="input email required user_email">
        <label class="email required" for="user_email">
          <abbr title="required">*</abbr> Email</label>
        <input class="string email required pa2 ba w-100" type="text" id="email" name="email" placeholder="EMAIL" onkeyup="this.getRootNode().host.updateEmail(this.value)" onkeydown="this.getRootNode().host.checkForEnter(event)">

      </div>
    </div>
    <div class="mv3">
      <div class="input password required user_password">
        <label class="password required" for="user_password">
          <abbr title="required">*</abbr> Password</label>
        <input class="password required pa2 ba w-100" type="password" id="password" name="password" placeholder="PASSWORD" onkeyup="this.getRootNode().host.updatePass(this.value)" onkeydown="this.getRootNode().host.checkForEnter(event)">
      </div>
    </div>
    <label class="pa0 ma0 lh-copy f6 pointer">
      <div class="input boolean required user_remember_me">
        <input value="0" type="hidden" name="user[remember_me]">
        <label class="checkbox"><input class="boolean required" required="required" aria-required="true" type="checkbox" value="1" name="user[remember_me]" id="user_remember_me"> I acknowledge this site is confidential and agree not to download or
          share anything from it, except forms.</label>
      </div>
    </label>
  </fieldset>
  <div class="lh-copy mt3">
    <button name="commit" class="btn" id="loginButton" onclick="this.getRootNode().host.signIn()"> Sign In </button>
    <br>


  </div>
</form>
`;
window.ShadyCSS && window.ShadyCSS.prepareTemplate(signIn_template, signIn);
class KoiSignup extends HTMLElement {
  /**
   * Guards against loops when reflecting observed attributes.
   * @param  {String} name Attribute name
   * @param  {any} value
   * @protected
   */
  safeSetAttribute(name, value) {
    if (this.getAttribute(name) !== value) this.setAttribute(name, value);
  }

  //what props change in a landing page that we need to monitor?
  static get observedAttributes() {
    return ['email', 'password', 'confirm_password', 'faa', 'lname', 'requestSent'];
  }

  get email() {
    return this._email;
  }
  set email(e) {
    this._email = e;
  }

  get password() {
    return this._pass;
  }
  set password(e) {
    this._pass = e;
  }

  // get passwordConfirm() {
  //   return this._passwordConfirm;
  // }
  // set passwordConfirm(e) {
  //   this._passwordConfirm = e;
  // }

  get requestSent() {
    return this._requestSent;
  }
  set requestSent(e) {
    this._requestSent = e;
  }

  get faaRespStatus() {
    return this._faaReqStatus;
  }
  set faaRespStatus(e) {
    this._faaReqStatus = e;
  }

  get faa() {
    return this._faa;
  }
  set faa(e) {
    this._faa = e;
  }

  get lname() {
    return this._lname;
  }
  set lname(e) {
    this._lname = e;
  }

  updateLname(lname) {
    this._lname = lname;
  }
  updateFaa(faa) {
    this._faa = faa;
  }
  updateEmail(email) {
    this._email = email;
  }
  updatePassword(pass) {
    this._pass = pass;
  }
  // updatePasswordConfirm(pass) {
  //   this._passwordConfirm = pass;
  //   if(this._pass.localeCompare(this._passwordConfirm)){
  //     //passwords match
  //   }else{
  //     //passwords do not match
  //   }
  // }
  updateRequestSent(rs) {
    this._requestSent = rs;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    //this tells the browser to render the contents and not the wrapper for accessibility reasons
    this.setAttribute('role', 'presentation');
    // Initialize shady styles if needed
    this.updateShadyStyles();
    if (!this.shadowRoot) {
      // create shadow tree
      this.attachShadow({
        mode: 'open'
      });
      this.shadowRoot.appendChild(signIn_template.content.cloneNode(true));
      this.shadowScrape = this.shadowRoot.getElementById('faaScrape');
      this.shadowSubmitButton = this.shadowRoot.getElementById('signUpButton');
      this.shadowSubmitDiv = this.shadowRoot.getElementById('signInDiv');
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this[name] = newVal;
  }

  disconnectedCallback() {}

  /**
   * When the polyfill is at play, ensure that styles are updated.
   * @protected
   */
  updateShadyStyles() {
    window.ShadyCSS && window.ShadyCSS.styleElement(this);
  }

  async updateFAA(faa) {
    if (faa.length === 7 && this._faa != faa && this._lname && !this._requestSent) {
      this._faa = faa;
      console.log(faa);
      console.log('has a request already been sent once?' + this._requestSent);
      this._requestSent = true;
      console.log('has a request already been sent once?' + this._requestSent);
      this.shadowScrape.style.flexWrap = 'nowrap';
      this.shadowScrape.innerHTML = '<div class="lds-hourglass"></div><div><p>Loading your FAA data now...</p><p>If this data does not update within 60 seconds, refresh to try again.</p><p>Make sure you have a good wifi connection</p></div>';
      let result = await this.scrapeFaa(this._lname, this._faa);
      if (localStorage.getItem('faaData')) {
        //why are you signing up for an account?
      } else {
        localStorage.setItem('faaData', JSON.stringify(result));
      }
    }
  }
  async updateLastName(lname) {
    this._lname = lname;
    if (this._faa && this._faa.length === 7 && this._lname && !this._requestSent) {
      console.log(lname);
      this._requestSent = true;
      this.shadowScrape.style.flexWrap = 'nowrap';
      this.shadowScrape.innerHTML = '<div class="lds-hourglass"></div><p>Loading your FAA data now...</p><p>If this data does not update within 60 seconds, refresh to try again.</p><p>Make sure you have a good wifi connection</p>';
      let result = await this.scrapeFaa(this._lname, this._faa);
    }
  }

  signIn() {
    console.log(this.email + ':' + this.pass);
    firebase.auth().signInWithEmailAndPassword(this.email, this.pass).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(this.email + ':' + this.password);
      console.log(errorMessage);
    });
  }

  async signUp(role) {
    let feedback = this.shadowSubmitButton;
    this.shadowSubmitButton.innerHTML = '<div class="lds-hourglass"></div>';
    this.shadowSubmitButton.childNodes[0].style.animation = "none";
    this.shadowSubmitButton.childNodes[0].style.animation = "lds-hourglass 1.2s infinite";
    console.log(this.email + ':' + this.password);
    if (this.email && this.password) {
      await firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
        feedback.innerHTML = 'Submit';
        return false;
      });
    } else {
      alert('Please enter an email and password');
      feedback.innerHTML = 'Submit';
      return false;
    }
    let result = await this.createRemoteUserData(firebase.auth().currentUser.uid, role);
  }
  async scrapeFaa(lname, faa) {
    console.log(lname, faa);
    let reqURL = 'https://us-east4-koifrog-mypilotportal.cloudfunctions.net/getPilotInfo?lname=' + lname + '&faa=' + faa;
    let result = await this.getData(reqURL);
    if (this.faaRespStatus === 200) {
      let mpp = JSON.parse(localStorage.getItem('mpp'));
      if (mpp) {
        mpp.user = {
          "data": {
            "name_last": lname,
            "confirmation_faa": faa
          }
        };
        mpp.pilot = {
          "faa": result
        }
      } else {
        localStorage.setItem("mpp", JSON.stringify({
          "user": {
            "data": {
              "name_last": lname,
              "confirmation_faa": faa
            }
          },
          "pilot": {
            "faa": result
          }
        }));
      }
    } else {
      console.log('bad scrape');
      localStorage.setItem("mpp", JSON.stringify({
        "user": {
          "data": {
            "name_last": lname,
            "confirmation_faa": faa
          }
        },
        "pilot": {
          "faa": "Could not contact FAA Airmen Inquiry Service. Please refresh again in a few seconds."
        }
      }));
    }
    console.log('scraped');
    //update views
    this.shadowScrape.style.flexWrap = 'wrap';
    this.shadowScrape.innerHTML = result.error ? result.errorMessage : '<div style="display: flex;flex-direction:flex-column;flex-wrap:wrap;"><span>Name: ' + (result.fullName ? result.fullName : 'Data not found') + '</span><span>Address: ' + (result.addressInfo ? result.addressInfo : 'Data not found') + '</span></div><span>If this information is incorrect or your data was not found please try again by refreshing your browser. Otherwise, please click the Submit button to get started!</span></div>';
    this.shadowSubmitButton.disabled = result.error ? true : false;
    return result;
  }
  async createRemoteUserData(userId, role) {
    console.log('Creating remote user: ' + userId);
    let mpp = JSON.parse(localStorage.getItem('mpp'));
    console.log('Local mpp:');
    let userData = {
      "confirmation_faa": this._faa,
      "confirmation_signature": "",
      "contact_phone": "",
      "contact_phone_alt": "",
      "name_last": this._lname,
      "user_email": this.email
    }
    mpp.user.data = userData;
    mpp.role = role;
    console.log(JSON.stringify(mpp));
    console.log('Creating remote data from local user:');
    try {
      let update = firebase.database().ref(userId + '/').set(mpp, function(error) {
        if (error) {
          // The write failed...
          console.log('Call to firebase set function failed');
          return false;
        } else {
          console.log('Call to firebase set function succeeded');
          // Data saved successfully!
          return true;
        }
      });
    } catch (e) {
      console.log('Remote write for user data failed.');
      console.log(e);
    }
    console.log(userId);
    console.log('Setting local vars for mpp:');
    localStorage.setItem('mpp', JSON.stringify(mpp));
    console.log('Local mpp:');
    console.log(localStorage.getItem('mpp'));
    console.log('Setting local vars for fbUD:');
    localStorage.setItem('fbUD', JSON.stringify(firebase.auth().currentUser));
    console.log('Local fbUD:');
    console.log(localStorage.getItem('fbUD'));
    return true;
  }

  async getData(url) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    console.log('response:');
    this.faaRespStatus = response.status;
    let r = await response.json();
    return r; // parses JSON response into native JavaScript objects
  }
}
const register_signIn = () => customElements.define(signIn, KoiSignup);
window.WebComponents ? window.WebComponents.waitFor(register_signIn) : register_signIn();
