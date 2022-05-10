const controller = new TweetsController();
controller.api.getTweets({ from: 0, count: 1000 }, controller);
if (controller.api.user === "") {
  document.forms[0][0].addEventListener("click", handleSignIn, false);
  document.forms[0][1].addEventListener("click", handleSignIn, false);
}
setTimeout(() => location.reload(), 300000);
// слушатель для прогрузки твитов
document.getElementById("refresh-button").onclick = function () {
  const filterConfig = {};
  filterConfig.author = document.forms[1][0].selectedOptions[0].innerText;
  let boolFilter = false;
  if (filterConfig.author === "Все пользователи") {
    filterConfig.author = "";
  } else {
    boolFilter = true;
  }

  filterConfig.hashtags = [];
  filterConfig.text = document.forms[1][4].value;
  if (document.forms[1][1].value) {
    filterConfig.dateFrom = document.forms[1][1].valueAsDate;
    boolFilter = true;
  }
  if (document.forms[1][2].value) {
    filterConfig.dateTo = document.forms[1][2].valueAsDate;
    boolFilter = true;
  }
  for (let i = 0; i < document.forms[1][3].selectedOptions.length; i++) {
    filterConfig.hashtags.push(
      document.forms[1][3].selectedOptions[i].innerText
    );
    boolFilter = true;
  }

  showTweets(
    controller.shownTweets,
    controller.shownTweets + 10,
    controller.modelTweetCollection.getPage(
      controller.shownTweets,
      controller.shownTweets + 10,
      filterConfig
    ),
    controller.modelTweetCollection.user,
    controller.tweetCollectionView.id,
    filterConfig
  );
  controller.shownTweets += 10;
  controller.shownTweets = Math.min(
    controller.shownTweets,
    controller.modelTweetCollection.tweetsArray.length
  );
};

// слушатель для кнопки фильтра
document.getElementById("filter").onclick = function (e) {
  e.preventDefault();

  if (document.getElementById("filter-box").style.display === "flex") {
    document.getElementById("filter-box").style.display = "none";
  } else {
    document.getElementById("filter-box").style.display = "flex";
  }
};
// слушатель для фильтра
document.forms[1][5].onclick = function (e) {
  e.preventDefault();
  const filterConfig = {};
  filterConfig.author = document.forms[1][0].selectedOptions[0].innerText;
  if (filterConfig.author === "Все пользователи") {
    filterConfig.author = "";
  }

  filterConfig.hashtags = [];
  filterConfig.text = document.forms[1][4].value;
  if (document.forms[1][1].value) {
    filterConfig.dateFrom = document.forms[1][1].valueAsDate;
  }
  if (document.forms[1][2].value) {
    filterConfig.dateTo = document.forms[1][2].valueAsDate;
  }
  for (let i = 0; i < document.forms[1][3].selectedOptions.length; i++) {
    filterConfig.hashtags.push(
      document.forms[1][3].selectedOptions[i].innerText
    );
  }
  controller.getFeed(0, 10, filterConfig);
};

document.forms[0][0].onfocus = function () {
  if (document.forms[0][0].value === "Введите текст")
    document.forms[0][0].value = "";
};
document.forms[0][0].onblur = function () {
  if (document.forms[0][0].value === "")
    document.forms[0][0].value = "Введите текст";
};
// слушатель добавить твит
document.forms[0][1].addEventListener("click", handleAdd, false);

function handleAdd() {
  document.forms[0][1].removeEventListener("click", handleEdit, false);
  const { value } = document.forms[0][0];
  if (value !== "Введите текст" && value !== "") {
    controller.api.postTweet(value, controller);
    //setTimeout(controller.addTweet(value), 1000);
  }
}
let idToEdit;
function handleEdit() {
  const { value } = document.forms[0][0];
  if (value !== "") {
    controller.api.editTweet(idToEdit, value, controller);
    document.forms[0][1].addEventListener("click", handleAdd, false);
  }
}

document.forms[4][0].onfocus = function () {
  if (document.forms[4][0].value === "Введите текст")
    document.forms[4][0].value = "";
};
document.forms[4][0].onblur = function () {
  if (document.forms[4][0].value === "")
    document.forms[4][0].value = "Введите текст";
};
// слушатели хэдера
document.querySelector("header").children[1].children[0].onclick = function (
  e
) {
  e.preventDefault();
  if (e.target.innerText === "Войти") {
    document
      .querySelector("header")
      .children[1].children[0].addEventListener("click", handleSignIn, false);
  } else {
    controller.api.user = undefined;
    controller.setCurrentUser();
  }
};

function handleSignIn(e) {
  e.preventDefault();
  document.getElementById("tweets-id").style.display = "none";
  document.getElementById("commentForm").style.display = "none";
  document.getElementById("tweet-id").style.display = "none";
  document.getElementById("comments-id").style.display = "none";
  document.getElementById("refresh-button").style.display = "none";
  document.getElementById("authorization-block").style.display = "block";
  document.getElementById("register-block").style.display = "none";
  document.getElementById("inputSection").style.display = "none";
}

// слушатель для входа
document.forms[2][2].onclick = function (e) {
  e.preventDefault();
  let login;
  let password;
  login = document.forms[2][0].value;
  password = document.forms[2][1].value;
  controller.api.login(login, password, controller);
};
//слушаетeль для регистрации
document.forms[2][3].onclick = function (e) {
  e.preventDefault();
  document.getElementById("authorization-block").style.display = "none";
  document.getElementById("register-block").style.display = "block";
  document.getElementsByClassName("sign-in-error")[1].style.visibility =
    "hidden";
  document.forms[3][3].onclick = function (e) {
    e.preventDefault();

    let login;
    let password;
    login = document.forms[3][0].value;
    password = document.forms[3][1].value;
    password2 = document.forms[3][2].value;
    if (password !== password2) {
      document.getElementsByClassName("sign-in-error")[1].style.visibility =
        "visible";
      document.getElementsByClassName("sign-in-error")[1].innerText =
        "Пароли должны совпадать!";
    }
    if (login === "" || password === "" || password2 === "") {
      document.getElementsByClassName("sign-in-error")[1].style.visibility =
        "visible";
      document.getElementsByClassName("sign-in-error")[1].innerText =
        "Заполните все поля!";
    } else {
      if (password === password2) {
        controller.api.registration(login, password);
      }
    }
  };
};

document.getElementById("tweets-id").onclick = function (event) {
  // event.preventDefault();
  if (
    event.target.tagName === "IMG" &&
    event.target.parentElement.classList.contains("trashBasket")
  ) {
    let id = event.target.parentElement.parentElement.children[0].innerText;
    controller.api.deleteTweet(id, controller);
  }
  if (
    event.target.tagName === "IMG" &&
    event.target.parentElement.classList.contains("edit")
  ) {
    idToEdit = event.target.parentElement.parentElement.children[0].innerText;
    document.forms[0][0].value =
      controller.modelTweetCollection.get(idToEdit).text;
    document.forms[0][1].removeEventListener("click", handleAdd);
    document.forms[0][1].addEventListener("click", handleEdit, false);
  }
  if (
    (event.target.tagName === "IMG" || event.target.tagName === "P") &&
    event.target.parentElement.classList.contains("tweet-answers")
  ) {
    let id =
      event.target.parentElement.parentElement.children[0].children[0]
        .innerText;
    document.forms[4][1].onclick = function (e) {
      e.preventDefault();
      const { value } = document.forms[4][0];
      if (value !== "Введите текст" && value !== "") {
        controller.api.addComment(id, value, controller);
      }
    };
    controller.showTweet(id);
  }
};
