class TweetView {
  constructor(tweetId, commentsId) {
    this.tweetId = tweetId;
    this.commentsId = commentsId;
  }

  display(user, tweet_item) {
    const tweetParent = document.getElementById(this.tweetId);
    const commentsParent = document.getElementById(this.commentsId);
    const tweet = document.createElement("section");
    const tweetInf = document.createElement("div");
    const username = document.createElement("span");
    const date = document.createElement("span");
    tweet.classList.add("tweet");
    tweetInf.classList.add("tweet-inf");

    username.innerText = `${tweet_item.author}:`;
    username.classList.add("username");
    date.innerText = formatDate(tweet_item.createdAt);
    tweetInf.append(username, date);
    date.classList.add("margin-right-mixed");

    const text = document.createElement("div");
    const twAnswers = document.createElement("div");
    const a = document.createElement("a");
    const retweet = document.createElement("img");
    const numberComments = document.createElement("p");

    text.classList.add("tweet-text");
    text.innerText = tweet_item.text;
    twAnswers.classList.add("tweet-answers");
    a.href = "tweet.html";
    retweet.src = "pics/retweet.svg";
    retweet.classList.add("icon");
    a.append(retweet);
    numberComments.innerText = tweet_item.comments.length;

    twAnswers.append(a, numberComments);

    tweet.append(tweetInf, text, twAnswers);
    tweetParent.append(tweet);

    for (let i = 0; i < tweet_item.comments.length; i++) {
      const comment = document.createElement("section");
      const commentInf = document.createElement("div");
      const commentUsername = document.createElement("span");
      const commentDate = document.createElement("span");
      comment.classList.add("comment");
      commentInf.classList.add("comment-inf");

      commentUsername.innerText = `${tweet_item.comments[i].author}:`;
      commentUsername.classList.add("username");
      commentDate.innerText = formatDate(tweet_item.comments[i].createdAt);
      commentInf.append(commentUsername, commentDate);
      commentDate.classList.add("margin-right-mixed");

      const commentText = document.createElement("div");

      commentText.classList.add("comment-text");
      commentText.innerText = tweet_item.comments[i].text;

      comment.append(commentInf, commentText);
      commentsParent.append(comment);
    }

    document.getElementById("commentForm").style.display = "block";
    document.getElementById("comments-id").style.display = "block";
    document.getElementById("tweets-id").style.display = "none";
    document.getElementById("tweet-id").style.display = "block";
    document.getElementById("refresh-button").style.display = "none";
  }
}
