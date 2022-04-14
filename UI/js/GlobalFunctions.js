class GlobalFunctions {
  static setCurrentUser(user) {
    HeaderView.display(user);
    tweetsCollection.user = user;
  }

  static addTweet(text) {
    tweetsCollection.add(text);
    tweetsView.display(tweetsCollection.user, tweetsCollection, 10);
  }

  static editTweet(id, text) {
    tweetsCollection.edit(id, text);
    tweetsView.display(tweetsCollection.user, tweetsCollection, 10);
  }

  static removeTweet(id) {
    tweetsCollection.remove(id);
    tweetsView.display(tweetsCollection.user, tweetsCollection, 10);
  }

  static getFeed(skip = 0, top = 10, filterConfig = {}) {
    GlobalFunctions.clear(tweetsView.id);
    tweetsView.display(
      tweetsCollection.user,
      tweetsCollection.getPage(skip, top, filterConfig)
    );
  }

  static showTweet(id) {
    GlobalFunctions.clear(tweetsView.id);
    GlobalFunctions.clear("filter-box");
    GlobalFunctions.clear("filter");
    document.getElementById("filter").style.visibility = "hidden";
    document.getElementById("inputSection").style.display = "none";
    const tweetView = new TweetView("tweets-id", "comments-id");
    const tweet = tweetsCollection.get(id);
    tweetView.display(tweetsCollection.user, tweet);
  }

  static clear(id) {
    let itemToDelete = document.getElementById(id);
    itemToDelete.innerHTML = "";
  }
}

// GlobalFunctions.showTweet("22");
