//KoiComponent - Generic Web Component
//observes state, reqStataus, and respStatus attributes
//nested properties: template, tag, state, reqStataus, and respStatus
//initialize() -
class KoiComponent extends HTMLElement {
  //--web native attribute calls--//
  //// WATCH THESE ATTRIBUTE VALUES ////
  static get observedAttributes() {
    return ['state','reqStatus', 'respStatus'];
  }
  //The above assumes your component will have attributes the communicate with remote data sources, if not you don't need a req or resp status
  async attributeChangedCallback(name, oldVal, newVal) {
    this[name] = newVal;
  }
  //--end web native attribute calls--//
  //Homebrew for safe setting component level attributes
  /**
   * Guards against loops when reflecting observed attributes.
   * @param  {String} name Attribute name
   * @param  {any} value
   * @protected
   */
  _setAttribute(name, value) {
    if(this.getAttribute(name) !== value){
      this.setAttribute(name, value);
    };
  }
  //-- web native component-local data get/set //
  get template() {
    return this._template;
  }
  set template(e) {
    this._template= e;
  }
  get tag() {
    return this._tag;
  }
  set tag(e) {
    this._tag= e;
  }
  get state() {
    return this._state;
  }
  set state(e) {
    this._state= e;
  }
  get reqStatus() {
    return this._state;
  }
  set reqStatus(e) {
    this._state= e;
  }
  get respStatus() {
    return this._state;
  }
  set respStatus(e) {
    this._state= e;
  }
  get host() {
    return this._host;
  }
  set host(e) {
    this._host= e;
  }
  //// temp is our wc html ////
  constructor() {
    super();
    this.tag = 'koi-component';
    this.template = document.createElement('template');
  }
  //// END this is just becauze we have to ////
  //// POLYFILL HELPER ////
  updateShadyStyles() {
    window.ShadyCSS && window.ShadyCSS.styleElement(this);
  }
  //// NATIVE COMPONENT FUNCTIONS ////
  ////LIFE CYCLE FUNCTION HELPERS ////
  async initialize(tag, temp){

    this._setAttribute('role', 'presentation');
    // Initialize shady styles w/ polyfill
    window.ShadyCSS && window.ShadyCSS.styleElement(this);
    if (!this.shadowRoot) {
      // create shadow tree
      var shadow = this.attachShadow({
        mode: 'open'
      });
    }
    if(this.template && this.template.content){
      this.shadowRoot.appendChild(this.template.content.cloneNode(true));
      // cache useful shadow selectors
    }
    this.host = this.getRootNode().host;
  }
  //// END LIFE CYCLE FUNCTIONS ////
  //// END NATIVE COMPONENT FUNCTIONS ////
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
      if(this.template){
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
        // cache useful shadow selectors
      }
    }
    this.selectElements();
  }
  //// WRAPPERS ////
  //LOCAl
  async getLocalValue(path) {
    console.log('Beginning get() for local value: '+path);
    let koiState;
    try{
      koiState = await JSON.parse(localStorage.getItem('mpp'));
    }catch(e){
      console.log('Error in getting local state:');
      console.log(e);
    }
    if (koiState) {
      console.log('localStorage data for for state: ');
      console.log(koiState);
      return koiState;
    } else {
      console.log('No State data stored locally in this Koifrog project.');
      return false;
    }
    return false;
  }
  async setLocalValue(path, value) {
    console.log('Beginning update to local value:' + path);
    console.log(value);
    let mpp = await JSON.parse(localStorage.getItem('mpp'));
    let keys = path.split('/');
    let table = keys[0];
    let prop = keys[1];
    if(table && mpp[table]){
      console.log('Writing to table '+table);
      if(prop){
        console.log('Writing to key '+prop);
        mpp[table][prop] = value;
        console.log(mpp);
        localStorage.setItem('mpp', JSON.stringify(mpp));
        return true;
      }else if(table){
        mpp[table] = value;
        localStorage.setItem('mpp', JSON.stringify(mpp));
        return true;
      }
    }else{
      console.log('Could not write to mpp object:');
      console.log(mpp);
      mpp[table] = {prop : value};
      return true;
    }
    return false;
  }
  //REMOTE
  async getRemoteValue(path) {
    let userId = firebase.auth().currentUser.uid;
    console.log('Beginning get() to remote value:' + userId + '/' + path);
    let value = await firebase.database().ref(userId + '/' + path);
    console.log('Remote value for '+ userId + '/' + path + ': '+value);
    return value;
  }
  async setRemoteValue(path, value) {
    console.log('Beginning update to remote value:' + path);
    let userId = firebase.auth().currentUser.uid;
    console.log('Call firebase set function with value:');
    console.log(value);
    let update = await firebase.database().ref(userId + '/' + path).set(value, function(error) {
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
    let date = new Date();
    let success = firebase.database().ref(userId + '/last_update').set(date, function(error) {
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
    return success;
  }
  // FULL
  async getValue(path){
    console.log('Getting local value for '+path+':');
    let vL = await this.getLocalValue(path);
    console.log('Getting remote value for '+path+':');
    let vR = await this.getRemoteValue(path);
    console.log('Local: ' + vL);
    console.log('Remote: ' + vR);
    //if value exists locally, use that
    if(vL == vR){
      return vL;
    }else{
      //otherwise use the remote value
      return vR;
    }
  }
  async setValue(path, value){
    console.log('Updating local storage for '+path+':');
    console.log(value);
    await this.setLocalValue(path, value);
    console.log('Updating remote storage for User Accident: ' + value);
    await this.setRemoteValue(path, value);
  }
  //ELEMENT SPECIFIC FUNCTIONS
  async selectElements(){
    console.log('this.tag == koicomponent');
    return true;
  }
  //FOREIGN//
  async setRemoteForeignValue(id, path, value) {
    console.log('Beginning update to remote value:' + path);
    console.log('Call firebase set function with value:');
    console.log(value);
    let update = await firebase.database().ref(id + '/' + path).set(value, function(error) {
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
    let date = new Date();
    let success = firebase.database().ref(id + '/last_update').set(date, function(error) {
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
    return success;
  }
  //// END  WRAPPERS ////
  //// TO BE BOUND TO INDIVIDUAL INPUTS ////
  //// END BOUND FUNCTIONS ////
}
async function registerWebComponent(tag, webComponentClass){
  let register_component = () => customElements.define(tag, webComponentClass);
  window.WebComponents ? window.WebComponents.waitFor(register_component) : register_component();
}
