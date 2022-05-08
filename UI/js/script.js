const tweets = [
  new Tweet("1", "Привет! #js #datamola", "2022-03-09T23:00:00", "Иванов Иван"),
  new Tweet("2", "Как дела?", "2022-03-09T23:00:01", "Петров Петр"),
  new Tweet(
    "3",
    "Подскажите торговые центры в Мюнхене",
    "2022-03-10T13:00:00",
    "Сорокина Лена"
  ),
  new Tweet(
    "4",
    "Где можно снять жилье недорого?",
    "2022-03-10T14:15:40",
    "Воробьева Агата"
  ),
  new Tweet(
    "5",
    "Если бы тут были картинки, я бы выложил свою собаку #люблюсобак",
    "2022-03-10T15:01:04",
    "Кураев Алексей"
  ),
  new Tweet(
    "6",
    "Переходите все на мой тг канал)))#покаInstagram",
    "2022-03-10T15:44:04",
    "Иванова Анастасия"
  ),
  new Tweet(
    "7",
    "Что общего у ворона и письменного стола? #help",
    "2022-03-11T10:10:10",
    "Кудрявец Таня"
  ),
  new Tweet(
    "11",
    "EPAM закрыл набор белоруссов... А я успел!#success",
    "2022-03-11T16:00:04",
    "Пупкин Макар"
  ),
  new Tweet(
    "12",
    "Читаю книжку про искусство и пью вино #жизньхороша",
    "2022-03-11T16:01:04",
    "Кураев Алексей"
  ),
  new Tweet(
    "8",
    "Я хотела уехать в Грузию, а сестра раскрасила мой паспорт #печаль#потрачено",
    "2022-03-11T15:44:04",
    "Шакун Маша"
  ),
  new Tweet(
    "9",
    "На каком языке ты пишешь?",
    "2022-03-11T15:44:05",
    "Славный Слава"
  ),
  new Tweet(
    "10",
    "Срочная замена паспорта стоит 100р... Грузия, жди меня! #timeforhachapury",
    "2022-03-11T15:55:04",
    "Шакун Маша"
  ),

  new Tweet(
    "13",
    "#StopWar#prayforukraine",
    "2022-03-11T16:05:04",
    "Булгакова Мира"
  ),
  new Tweet(
    "14",
    "Препод по философии душнила",
    "2022-03-11T16:11:04",
    "Петров Петр"
  ),
  new Tweet("15", "Знаешь ли ты?", "2022-03-11T16:44:04", "Славный Слава"),
  new Tweet(
    "16",
    "Посоветуйте что почитать",
    "2022-03-11T16:50:04",
    "Шакун Маша"
  ),
  new Tweet(
    "17",
    "Как провести оплату в интернет-сервисе, если Mastercard и Visa не работуют? #санкции#вопрос",
    "2022-03-11T16:52:54",
    "Иванов Иван"
  ),
  new Tweet(
    "18",
    "Поменяла доллары, а курс упал #fail",
    "2022-03-11T17:00:11",
    "Воробьева Агата"
  ),
  new Tweet(
    "19",
    "Посоветуйте ресурсы для изучения js",
    "2022-03-11T17:30:11",
    "Иванов Иван"
  ),
  new Tweet(
    "20",
    "Наконец весна и стало теплее! Утренние пробежки, ждите меня #спорт",
    "2022-03-11T17:55:04",
    "Сорокина Лена"
  ),
  new Tweet(
    "21",
    "Сходила на Бетмена.Как же женщина-кошка хороша!",
    "2022-03-11T18:00:04",
    "Иванова Анастасия"
  ),
  new Tweet(
    "22",
    "Кто хочет вечером встретиться на чашечку чая - пишите в комментарии!",
    "2022-03-11T18:18:18",
    "Кураев Алексей"
  ),
];

tweets.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
// localStorage.removeItem("tweets");
const controller = new TweetsController();

if (controller.modelTweetCollection.user === "") {
  document.forms[0][0].addEventListener("click", handleSignIn, false);
  document.forms[0][1].addEventListener("click", handleSignIn, false);
}
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
    //  controller.modelTweetCollection.tweetsArray,
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
    controller.addTweet(value);
  }
}
let idToEdit;
function handleEdit() {
  const { value } = document.forms[0][0];
  if (value !== "") {
    controller.editTweet(idToEdit, value);
    document.forms[0][1].addEventListener("click", handleAdd, false);
  }
}

// слушатели для удаления/редактирования твита
for (let i = 0; i < controller.modelTweetCollection.tweetsArray.length; i++) {
  const elem = document.getElementsByClassName("tweet")[i];

  if (elem && elem.children[0].children.length > 2) {
    elem.children[0].children[3].onclick = function () {
      controller.removeTweet(controller.modelTweetCollection.tweetsArray[i].id);
      location.reload();
    };

    elem.children[0].children[2].onclick = function () {
      document.forms[0][0].value =
        controller.modelTweetCollection.tweetsArray[i].text;
      idToEdit = controller.modelTweetCollection.tweetsArray[i].id;
      document.forms[0][1].removeEventListener("click", handleAdd);
      document.forms[0][1].addEventListener("click", handleEdit, false);
      // location.reload();
      // controller.removeTweet(controller.modelTweetCollection.tweetsArray[i].id);
    };
  } else if (!elem) {
    i = controller.modelTweetCollection.tweetsArray.length;
    break;
  }

  elem.children[2].onclick = function () {
    controller.showTweet(controller.modelTweetCollection.tweetsArray[i].id);
    //слушатель для комментариев
    document.forms[4][1].onclick = function (e) {
      e.preventDefault();
      const { value } = document.forms[4][0];
      if (value !== "Введите текст" && value !== "") {
        controller.modelTweetCollection.addComment(
          controller.modelTweetCollection.tweetsArray[i].id,
          value
        );

        controller.showTweet(controller.modelTweetCollection.tweetsArray[i].id);
      }
    };
  };
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
  // controller.setCurrentUser();
  // if (!controller.signUp(login, password)) {
  //   document.getElementsByClassName("sign-in-error")[0].style.visibility =
  //     "visible";
  // } else {
  //   location.reload();
  // }
};
//слушаетeль для регистрации
document.forms[2][3].onclick = function (e) {
  e.preventDefault();
  document.getElementById("authorization-block").style.display = "none";
  document.getElementById("register-block").style.display = "block";

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
        // if (!controller.register(login, password)) {
        // document.getElementsByClassName("sign-in-error")[1].style.visibility =
        //   "visible";
        // document.getElementsByClassName("sign-in-error")[1].innerText =
        //   "Пользователь уже существует!";
        // }
      }
    }
  };

  // location.reload();
};
