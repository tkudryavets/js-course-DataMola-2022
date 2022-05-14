"use strict";
class TweetFeedApiService {
  constructor(url) {
    this.url = url;
    this.token = JSON.parse(localStorage.getItem("token"))?.token;
    this.user = localStorage.getItem("user");
    if (this.user === "undefined" || this.token === "undefined") {
      this.user = undefined;
    }
  }

  login(login, password, controller) {
    const formdata = { login, password };

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(formdata),
      redirect: "follow",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    };

    fetch(`${this.url}login`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem("token", JSON.stringify(result));
        if (result.statusCode >= 400) {
          this.user = undefined;
          localStorage.removeItem("user");
          if (result.statusCode === 403) {
            document.getElementsByClassName(
              "sign-in-error"
            )[0].style.visibility = "visible";
          }
        } else {
          this.user = formdata.login;
          localStorage.setItem("user", JSON.stringify(this.user));
          controller.setCurrentUser();
        }
      })
      .catch((error) => console.log("error", error));
  }

  registration(login, password) {
    const formdata = { login, password };
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(formdata),
      redirect: "follow",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    };

    fetch(`${this.url}registration`, requestOptions)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((result) => {
        if (result.statusCode === 409) {
          document.getElementsByClassName("sign-in-error")[1].style.visibility =
            "visible";
          document.getElementsByClassName("sign-in-error")[1].innerText =
            "Пользователь уже существует!";
        }
      });

    setTimeout(() => {
      fetch(`${this.url}login`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          localStorage.setItem("token", JSON.stringify(result));
          if (result.statusCode >= 400) {
            this.user = undefined;
            localStorage.removeItem("user");
          } else {
            this.user = formdata.login;
            localStorage.setItem("user", JSON.stringify(this.user));
          }

          console.log(result);
        })
        .catch((error) => console.log("error", error));
    }, 1000);
  }

  getTweets(filterConfig, controller) {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    };
    let params = "",
      array;
    for (const key in filterConfig) {
      params += `${key}=${filterConfig[key]}&`;
    }
    fetch(`${this.url}tweet?${params}`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        let tweetObj;
        for (let i = 0; i < result.length; i++) {
          tweetObj = result[i];
          result[i] = new Tweet(
            tweetObj.id,
            tweetObj.text,
            tweetObj.createdAt,
            tweetObj.author
          );
          for (let j = 0; j < tweetObj.comments.length; j++) {
            result[i].comments.push(
              new Comment(
                tweetObj.comments[j].id,
                tweetObj.comments[j].text,
                tweetObj.comments[j].createdAt,
                tweetObj.comments[j].author
              )
            );
          }
          //   location.reload();
        }
        controller.modelTweetCollection.user = controller.api.user;
        controller.modelTweetCollection.addAll(result);
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
        controller.filterView.display(
          controller.modelTweetCollection.tweetsArray
        );
        controller.shownTweets += 10;
        //location.reload();
      })
      .catch((error) => console.log("error", error));
  }

  postTweet(text, controller) {
    const formdata = {
      text,
    };
    this.token = JSON.parse(localStorage.getItem("token"));
    if (this.token !== null) this.token = this.token.token;

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(formdata),
      redirect: "follow",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      }),
    };
    fetch(`${this.url}tweet`, requestOptions)
      .then((response) => {
        if (response.status < 400) {
          console.log("add");
          controller.addTweet(text);
        }
        return response;
      })
      .catch((error) => console.log("error", error));
  }

  deleteTweet(id, controller) {
    this.token = JSON.parse(localStorage.getItem("token"));
    if (this.token !== null) this.token = this.token.token;

    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      }),
    };
    fetch(`${this.url}tweet/${id}`, requestOptions)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result.statusCode < 400) {
          controller.removeTweet(id);
        }
        return result;
      })
      .catch((error) => console.log("error", error));
  }
  editTweet(id, text, controller) {
    const formdata = {
      text,
    };
    this.token = JSON.parse(localStorage.getItem("token"));
    if (this.token !== null) this.token = this.token.token;

    const requestOptions = {
      method: "PUT",
      body: JSON.stringify(formdata),
      redirect: "follow",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      }),
    };
    fetch(`${this.url}tweet/${id}`, requestOptions)
      .then((response) => {
        //  console.log(response.json());
        return response;
      })
      .then((result) => {
        console.log(result);
        if (result.status < 400) {
          controller.editTweet(id, text);
          document.forms[0][0].value = "Введите текст";
        }
        return result;
      })
      .catch((error) => console.log("error", error));
  }

  addComment(tweetID, text, controller) {
    const formdata = {
      text,
    };
    this.token = JSON.parse(localStorage.getItem("token"));
    if (this.token !== null) this.token = this.token.token;

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(formdata),
      redirect: "follow",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      }),
    };
    fetch(`${this.url}tweet/${tweetID}/comment`, requestOptions)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result) {
          controller.modelTweetCollection.addComment(tweetID, text);
          controller.showTweet(tweetID);
        }
        return result;
      })
      .catch((error) => console.log("error", error));
  }
}
