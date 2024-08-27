class UserInfo {
  constructor({ profileNameSelector, profileJobSelector }) {
    this._profileName = document.querySelector(profileNameSelector).textContent;
    this._profileJob = document.querySelector(profileJobSelector).textContent;
  }

  getUserInfo() {
    return {
      profileName: this._profileName,
      profileJob: this._profileJob,
    };
  }

  setUserInfo({ profileName, profileJob }) {
    this._profileName = profileName;
    this._profileJob = profileJob;
  }
}

export default UserInfo;
