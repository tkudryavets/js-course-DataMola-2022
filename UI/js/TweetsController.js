class TweetsController {
  constructor(tweets = []) {
    this.modelTweetCollection = new TweetCollection(tweets);
    this.tweetCollectionView = new TweetCollectionView(
      "tweets-id",
      this.modelTweetCollection
    );
    this.headerView = new HeaderView("html");
    this.filterView = new FilterView("filter-box");
    this.tweetView = new TweetView("tweet-id", "comments-id");
    this.modelTweetCollection.restore();

    this.shownTweets = 10;
    this.api = new TweetFeedApiService("https://jslabapi.datamola.com/");
    // let user = JSON.parse(localStorage.getItem("user"));
    let user = localStorage.getItem("user");
    if (!user) user = "";
    this.tweetCollectionView.display(
      user,
      this.modelTweetCollection.tweetsArray,
      this.filterView
    );
    this.headerView.display(user);
    this.userList = new UserList(this.modelTweetCollection);
    this.setCurrentUser();
  }

  setCurrentUser() {
    this.headerView.display(this.api.user);
    document.getElementById("tweets-id").style.display = "block";

    document.getElementById(
      "inputSection"
    ).children[0].children[0].children[0].children[0].innerHTML = `${
      this.api.user ?? ""
    }`;
    this.clear("tweets-id");
    this.tweetCollectionView.display(
      this.api.user,
      this.modelTweetCollection.getPage(),
      this.filterView
    );
  }

  addTweet(text) {
    this.modelTweetCollection.add(text);
    this.modelTweetCollection.save();
    this.clear("tweets-id");
    this.tweetCollectionView.display(
      this.api.user,
      this.modelTweetCollection.getPage(),
      this.filterView
    );
  }

  editTweet(id, text) {
    this.modelTweetCollection.edit(id, text);
    this.modelTweetCollection.save();

    this.clear("tweets-id");
    this.tweetCollectionView.display(
      this.api.user,
      this.modelTweetCollection.getPage(),
      this.filterView
    );
  }

  removeTweet(id) {
    this.modelTweetCollection.remove(id);
    this.clear("tweets-id");
    this.tweetCollectionView.display(
      this.api.user,
      this.modelTweetCollection.getPage(0),
      this.filterView
    );
  }

  getFeed(skip = 0, top = 10, filterConfig = {}) {
    this.clear(this.tweetCollectionView.id);
    this.clear("tweets-id");

    this.tweetCollectionView.display(
      this.api.user,
      this.modelTweetCollection.getPage(skip, top, filterConfig),
      this.filterView
    );
    this.shownTweets = top - skip;
    // this.shownTweets = this.modelTweetCollection.getPage(
    //   skip,
    //   top,
    //   filterConfig
    // ).length;
  }

  showTweet(id) {
    document.getElementById("inputSection").style.display = "none";
    document.getElementById("tweet-id").style.display = "block";
    document.getElementById("refresh-button").style.display = "none";
    const tweet = this.modelTweetCollection.get(id);

    this.clear("tweet-id");
    this.clear("comments-id");
    this.tweetView.display(this.api.user, tweet);
  }

  clear(id) {
    const itemToDelete = document.getElementById(id);
    itemToDelete.innerHTML = "";
  }

  // register(login, password) {
  //   if (this.userList.findUser({ login: login, password: password })) {
  //     return false;
  //   }
  //   this.userList.addUser({ login: login, password: password });
  //   this.userList.save();
  //   this.setCurrentUser(login);
  //   this.userList.saveCurrentUser({ login: login, password: password });
  //   return true;
  // }

  // signUp(login, password) {
  //   if (this.userList.findUser({ login: login, password: password })) {
  //     this.setCurrentUser(login);
  //     this.userList.saveCurrentUser({ login: login, password: password });
  //     return true;
  //   }
  //   // throw Error("User not found");
  //   return false;
  // }
}
