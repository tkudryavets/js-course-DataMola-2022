class GlobalFunctions {
  static setCurrentUser(user) {
    header.display(user);
    tweetsCollection.user = user;
    document.getElementById(
      "inputSection"
    ).children[0].children[0].children[0].children[0].innerHTML = `${user}`;
  }

  static addTweet(text) {
    tweetsCollection.add(text);
    this.clear("tweets-id");
    tweetsView.display(tweetsCollection.user, tweetsCollection.getPage());
  }

  static editTweet(id, text) {
    tweetsCollection.edit(id, text);
    this.clear("tweets-id");

    tweetsView.display(tweetsCollection.user, tweetsCollection.getPage());
  }

  static removeTweet(id) {
    tweetsCollection.remove(id);
    this.clear("tweets-id");

    tweetsView.display(tweetsCollection.user, tweetsCollection.getPage(0));
  }

  static getFeed(skip = 0, top = 10, filterConfig = {}) {
    GlobalFunctions.clear(tweetsView.id);
    this.clear("tweets-id");

    tweetsView.display(
      tweetsCollection.user,
      tweetsCollection.getPage(skip, top, filterConfig)
    );
  }

  static showTweet(id) {
    document.getElementById("inputSection").style.display = "none";
    document.getElementById("tweets-id").style.display = "none";
    const tweetView = new TweetView("tweet-id", "comments-id");
    const tweet = tweetsCollection.get(id);
    this.clear("tweet-id");
    tweetView.display(tweetsCollection.user, tweet);
  }

  static clear(id) {
    let itemToDelete = document.getElementById(id);
    itemToDelete.innerHTML = "";
  }
}
