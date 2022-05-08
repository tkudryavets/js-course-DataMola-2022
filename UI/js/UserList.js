class UserList {
  constructor(model, list = []) {
    this.userList = list;
    this.modelTweetCollection = model;
    this.restore();
  }

  addUser(user) {
    this.userList.push(user);
    this.save();
  }

  findUser(user) {
    for (let i = 0; i < this.userList.length; i++) {
      if (
        this.userList[i].login === user.login &&
        this.userList[i].password === user.password
      ) {
        return true;
      }
    }
    return false;
  }

  save() {
    localStorage.setItem("users", JSON.stringify(this.userList));
  }

  // saveCurrentUser(user) {
  //   localStorage.setItem("user", JSON.stringify(user));
  // }
  restore() {
    this.userList = JSON.parse(localStorage.getItem("users"));
    // let userObj;

    // for (let i = 0; i < this.modelTweetCollection.tweetsArray.length; i++) {
    //   if (
    //     !this.findUser({
    //       login: `${this.modelTweetCollection.tweetsArray[i].author}`,
    //       password: "12345678",
    //     })
    //   ) {
    //     this.addUser({
    //       login: `${this.modelTweetCollection.tweetsArray[i].author}`,
    //       password: "12345678",
    //     });
    //   }
    // }
  }
}
