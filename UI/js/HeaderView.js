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
      button.classList.toggle("orange-button");
      button.classList.toggle("white-button");
      button.innerHTML = "Выйти";
    } else {
      name.style.display = "none";
      button.classList.toggle("orange-button");
      button.classList.toggle("white-button");
      button.innerHTML = "Войти";
    }
  }
}

const header = new HeaderView("html");
header.display();
header.display("Таня Кудрявец");
