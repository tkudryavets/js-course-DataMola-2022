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
    this.tweetCollectionView.display(
      this.modelTweetCollection.user,
      this.modelTweetCollection.tweetsArray,
      this.filterView
    );
  }
  setCurrentUser(user) {
    this.headerView.display(user);
    this.modelTweetCollection.user = user;
    document.getElementById(
      "inputSection"
    ).children[0].children[0].children[0].children[0].innerHTML = `${user}`;
  }

  addTweet(text) {
    this.modelTweetCollection.add(text);
    this.clear("tweets-id");
    this.tweetCollectionView.display(
      this.modelTweetCollection.user,
      this.modelTweetCollection.getPage(),
      this.filterView
    );
  }

  editTweet(id, text) {
    this.modelTweetCollection.edit(id, text);
    this.clear("tweets-id");
    this.tweetCollectionView.display(
      this.modelTweetCollection.user,
      this.modelTweetCollection.getPage(),
      this.filterView
    );
  }

  removeTweet(id) {
    this.modelTweetCollection.remove(id);
    this.clear("tweets-id");
    this.tweetCollectionView.display(
      this.modelTweetCollection.user,
      this.modelTweetCollection.getPage(0),
      this.filterView
    );
  }

  getFeed(skip = 0, top = 10, filterConfig = {}) {
    this.clear(this.tweetCollectionView.id);
    this.clear("tweets-id");

    this.tweetCollectionView.display(
      this.modelTweetCollection.user,
      this.modelTweetCollection.getPage(skip, top, filterConfig),
      this.filterView
    );
  }

  showTweet(id) {
    document.getElementById("inputSection").style.display = "none";
    document.getElementById("tweets-id").style.display = "none";
    const tweet = this.modelTweetCollection.get(id);
    this.clear("tweet-id");
    this.tweetView.display(this.modelTweetCollection.user, tweet);
  }

  clear(id) {
    let itemToDelete = document.getElementById(id);
    itemToDelete.innerHTML = "";
  }
}
