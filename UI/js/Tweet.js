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
