/* eslint-disable comma-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable default-case */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
class TweetCollection {
  constructor(twsArray = []) {
    this._tweetsArray = twsArray;
    this.tweetsArray.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
    this._user = "";
  }

  get user() {
    return this._user;
  }

  set user(user) {
    this._user = user;
  }

  get tweetsArray() {
    return this._tweetsArray;
  }

  set tweetsArray(array) {
    if (Array.isArray(array)) {
      this._tweetsArray = array;
    }
  }

  addAll(twsArray) {
    const wrongTweets = [];
    if (twsArray.length > 0) {
      twsArray.forEach((tweet) => {
        if (Tweet.validate(tweet)) {
          this.tweetsArray.push(tweet);
        } else {
          wrongTweets.push(tweet);
        }
      });
    }
    this.tweetsArray.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
    return wrongTweets;
  }

  clear() {
    this.tweetsArray.length = 0;
  }

  getPage(skip = 0, top = 10, filterConfig = {}) {
    if (typeof skip !== "number" || typeof top !== "number") {
      return console.log("Ошибка ввода данных в фильтр");
    }
    let paginationTweets = this.tweetsArray;
    const keys = Object.keys(filterConfig);

    for (const filter of keys) {
      switch (filter) {
        case "author":
          paginationTweets = paginationTweets.filter(
            // eslint-disable-next-line comma-dangle
            (tweet) => tweet.author === filterConfig.author
          );
          break;

        case "dateFrom":
          paginationTweets = paginationTweets.filter(
            (tweet) =>
              tweet.createdAt.getTime() >= filterConfig.dateFrom.getTime()
          );
          break;

        case "dateTo":
          paginationTweets = paginationTweets.filter(
            (tweet) =>
              tweet.createdAt.getTime() <= filterConfig.dateTo.getTime()
          );
          break;

        case "hashtags":
          paginationTweets = paginationTweets.filter((tweet) => {
            let result = true;
            for (let i = 0; i < filterConfig[filter].length; i++) {
              if (tweet.text.indexOf(`#${filterConfig[filter][i]}`) === -1) {
                result = false;
              }
            }
            return result;
          });
          break;

        case "text":
          paginationTweets = paginationTweets.filter(
            (tweet) => tweet.text.indexOf(filterConfig[filter]) !== -1
          );
          break;
      }
    }

    paginationTweets = paginationTweets.slice(skip, top + skip);

    return paginationTweets;
  }

  get(id) {
    return this.tweetsArray.find((item) => item.id === id);
  }

  add(text) {
    if (this.user === "") {
      return false;
    }
    const ID = Date.now() * 1000 + Math.floor(Math.random() * 1000);
    if (text.length <= 280) {
      const tw = new Tweet(ID.toString(), text, new Date(), this.user);
      this._tweetsArray.unshift(tw);
      return true;
    }
    return false;
  }

  edit(id, text) {
    if (this._user === "") {
      return false;
    }

    let tweet = this.tweetsArray.find((item) => item.id === id);
    if (
      text.length <= 280 &&
      text.length > 0 &&
      tweet &&
      tweet.author === this._user
    ) {
      tweet.text = text;
      return true;
    }
    return false;
  }

  remove(id) {
    if (this.user === "") {
      return false;
    }
    let i = this.tweetsArray.findIndex((item) => item.id === id);
    if (i !== -1 && this.tweetsArray[i].author === this.user) {
      this.tweetsArray.splice(i, 1);
      return true;
    }

    return false;
  }

  addComment(id, text) {
    if (this.user === "") {
      return false;
    }
    const idCom = Date.now() * 1000 + Math.floor(Math.random() * 1000);
    const comment = new Comment(idCom.toString(), text, new Date(), this.user);
    if (Comment.validate(comment) && this.get(id)) {
      this.get(id).comments.push(comment);
      return true;
    }
    return false;
  }
}

const tweetsCollection = new TweetCollection(tweets);
tweetsCollection.user = "Кудрявец Таня";
// console.log(tweetsCollection.get("11"));
console.log(tweetsCollection.addComment("22", "hello"));
// console.log(tweetsCollection.remove("44"));
// console.log(tweetsCollection.remove("12"));
// console.log(tweetsCollection.edit("7", "tweet is edited"));
// console.log(tweetsCollection.remove("7"));
// console.log(tweetsCollection.getPage(5, 15));
// tweetsCollection.clear();
// console.log(tweetsCollection.add("new tweet is here!"));
// console.log(tweetsCollection.tweetsArray);
