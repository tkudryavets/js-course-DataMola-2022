class HeaderView {
  constructor(id) {
    this.id = id;
  }

  display(user) {
    const header = document.querySelector(header);
    let name = header.getElementByClassName("username-header");
    if (user) {
      name.innerHTML(user);
    } else {
      name.style.display = "none";
    }
  }
}
