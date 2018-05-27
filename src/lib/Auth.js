class Auth {
  static setToken(token) {
    localStorage.setItem('token', token);

  }
  // get the token from local storage
  static getToken() {
    return localStorage.getItem('token');
  }
  // when we log out we deleted the payload
  static logout() {
    localStorage.removeItem('token');
  }

  //gets the jwt token, splits it bewtween the three sections in the header //
  // then puts it in an array and then takes out the seconds bit (the payload),
  //then using atob is decrypts it and reutrns and object
  static getPayload() {
    const token = this.getToken();
    if(!token) return null;
    const parts = token.split('.');
    if(parts.length < 3) return null;
    return JSON.parse(atob(parts[1]));

  }

  static isAuthenticated(){
    const payload = this.getPayload();
    if(!payload) return false;
    const now = Math.round(Date.now() / 1000);
    return now < payload.exp;

  }

  static isCurrentUser(user) {
    return this.isAuthenticated() && user._id === this.getpayload().sub;
  }

}

export default Auth;
