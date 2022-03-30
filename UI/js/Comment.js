/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable linebreak-style */
class Comment {
  constructor(id, text, createAt, author) {
    this._id = id;
    this.text = text;
    this._author = author;
    this._createdAt = new Date(createAt);
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

  static validate(com) {
    if (Object.keys(com).length !== 4) return false;

    if (+com.id <= 0) {
      return false;
    }
    if (
      typeof com.author !== "string" ||
      typeof com.text !== "string" ||
      com.author.length <= 0 ||
      com.text.length <= 0 ||
      com.text.length > 280
    ) {
      return false;
    }

    if (!com.createdAt.getFullYear()) {
      return false;
    }

    return true;
    // {
    //   for (const key in com) {
    //     if (Object.hasOwnProperty.call(com, key)) {
    //       const element = com[key];
    //       switch (key) {
    //         case "id":
    //           if (+element <= 0) {
    //             return false;
    //           }
    //           break;

    //         case "text":
    //         case "author":
    //           if (typeof element !== "string" || element.length == 0) {
    //             return false;
    //           }
    //           if (element.length > 280) return false;
    //           break;

    //         case "createdAt":
    //           if (!element.getFullYear()) {
    //             return false;
    //           }
    //           break;

    //         default:
    //           return false;
    //       }
    //     } else return false;
    //   }
    // }
    // return true;
  }
}
