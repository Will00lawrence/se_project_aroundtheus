class UserInfo {
  constructor({ profileTitleSelector, profileDescriptionSelector }) {
    this._profileTitle = document.querySelector(profileTitleSelector);
    this._profileDescription = document.querySelector(
      profileDescriptionSelector
    );
  }

  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      job: this._profileDescription.textContent,
    };
  }

  setUserInfo(profileTitle, profileDescription) {
    this._profileTitle.textContent = profileTitle;
    this._profileDescription.textContent = profileDescription;
  }
}

export default UserInfo;
