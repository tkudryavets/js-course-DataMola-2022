class UserList {
  constructor(list = []) {
    this.userList = list;
  }

  addUser(user) {
    this.userList.push(user);
  }

  findUser(user) {
    return this.userList.find(user);
  }
}
