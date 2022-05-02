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
    //text.innerText = tweet_item.text;

    let textBeforeTag;
    const regexp = /#[а-яА-ЯёЁA|\w]{0,30}/g;

    let tagsArray = tweet_item.text.matchAll(regexp);
    tagsArray = Array.from(tagsArray);
    let firstInd = 0;
    let lastInd = 0;
    if (tagsArray === null || !tagsArray.length) {
      text.innerText = tweet_item.text;
    } else {
      for (let i = 0; i < tagsArray.length; i++) {
        lastInd = tweet_item.text.indexOf(tagsArray[i][0]) - 1;
        textBeforeTag = tweet_item.text.substr(
          firstInd,
          lastInd - firstInd + 1
        );
        text.innerHTML += `${textBeforeTag}<span style="color: var(--orange-color)">${tagsArray[i][0]}</span>`;

        firstInd = lastInd + tagsArray[i][0].length + 1;
      }
      text.innerHTML += tweet_item.text.substr(
        firstInd,
        tweet_item.text.length - lastInd
      );
    }

    twAnswers.classList.add("tweet-answers");

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
      commentDate.innerText = formatDate(
        new Date(tweet_item.comments[i].createdAt)
      );
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
    document.getElementById("authorization-block").style.display = "none";
    document.getElementById("tweet-id").style.display = "block";
    document.getElementById("refresh-button").style.display = "none";
  }
}
