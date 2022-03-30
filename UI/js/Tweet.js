/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable linebreak-style */
class Tweet {
  constructor(id, text, createAt, author) {
    this._id = id;
    this.text = text;
    this._author = author;
    this._createdAt = new Date(createAt);
    this.comments = [];
  }

  get id() {
    return this._id;
  }

  set id(id) {
    console.log("Cannot set id", id);
    return;
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(date) {
    console.log("Cannot set date", date);
    return;
  }

  get author() {
    return this._author;
  }

  set author(author) {
    console.log("Cannot set author", author);
    return;
  }

  static validate(tw) {
    if (Object.keys(tw).length !== 5) return false;

    for (const key in tw) {
      if (Object.hasOwnProperty.call(tw, key)) {
        const element = tw[key];
        switch (key) {
          case "id":
            if (+element <= 0) {
              return false;
            }
            break;

          case "text":
          case "author":
            if (typeof element !== "string" || element.length == 0) {
              return false;
            }
            if (element.length > 280) return false;
            break;

          case "createdAt":
            if (!element.getFullYear()) {
              return false;
            }
            break;

          case "comments":
            for (let i = 0; i < element.length; i++) {
              if (!Comment.validate(element[i])) return false;
            }
            break;
          default:
            return false;
        }
      } else return false;
    }
    return true;
  }
}

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
