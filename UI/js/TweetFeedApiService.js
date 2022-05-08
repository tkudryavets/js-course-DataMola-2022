class TweetFeedApiService {
  constructor(url) {
    this.url = url;
    this.user = localStorage.getItem("user");
    this.token = undefined;
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
        if (result.error !== undefined) {
          this.user = undefined;
          localStorage.removeItem("user");
        } else {
          this.user = formdata.login;
          localStorage.setItem("user", this.user);
          console.log(this.user);
          controller.setCurrentUser();
        }
      })
      .catch((error) => console.log("error", error));
  }

  registration(login, password) {
    let formdata = { login: login, password: password };
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
      .then((data) => {
        console.log(data);
      });

    fetch(`${this.url}registration`, requestOptions);
    setTimeout(() => {
      fetch(`${this.url}login`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          localStorage.setItem("token", JSON.stringify(result));
          if (result.error !== undefined) {
            this.user = undefined;
            localStorage.removeItem("user");
          } else {
            this.user = formdata.login;
            localStorage.setItem("user", this.user);
            console.log(this.user);
          }

          console.log(result);
        })
        .catch((error) => console.log("error", error));
    }, 1000);
  }
}
