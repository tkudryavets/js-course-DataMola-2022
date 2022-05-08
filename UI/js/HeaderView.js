class HeaderView {
  constructor(id) {
    this.id = id;
  }

  display(user) {
    const name = document.querySelector("header").children[2];
    const button = document.querySelector("header").children[1].children[0];
    if (user) {
      name.innerHTML = user;
      name.style.display = "block";
      button.classList.add("orange-button");
      button.classList.remove("white-button");
      button.innerHTML = "Выйти";
    } else {
      name.style.display = "none";
      button.classList.remove("orange-button");
      button.classList.add("white-button");
      button.innerHTML = "Войти";
    }
  }
}
