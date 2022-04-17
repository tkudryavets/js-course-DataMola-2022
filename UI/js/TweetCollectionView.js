class TweetCollectionView {
  constructor(id) {
    this.id = id;
  }

  display(user, tweetsCollection, filter) {
    filter.display(tweetsCollection);
    const inputSection = document.createElement("section");
    const form = document.createElement("form");
    const inputUser = document.createElement("div");
    const relativeDiv = document.createElement("div");
    const messageInput = document.createElement("div");
    inputUser.classList.add("tweet-inf");
    inputUser.classList.add("username");
    inputUser.innerHTML = "<span>" + user + ":</span>";
    messageInput.classList.add("message-input");
    relativeDiv.style = "position: relative";
    relativeDiv.innerHTML =
      '<hr><textarea colums="60" rows="5">Введите текст </textarea><button type="submit" class="orange-button">Готово</button>';
    form.append(inputUser);
    form.append(relativeDiv);
    messageInput.append(form);
    inputSection.append(messageInput);

    const tweetsList = document.getElementById(this.id);

    const editButton = document.createElement("div");
    const trashBasket = document.createElement("div");

    const editPic = document.createElement("img");
    const trashBasketPic = document.createElement("img");
    editPic.src = "pics/edit.svg";
    trashBasketPic.src = "pics/trash-busket.svg";
    editPic.classList.add("icon");
    trashBasketPic.classList.add("icon");
    editButton.classList.add("tweet-inf-button");
    trashBasket.classList.add("tweet-inf-button", "margin-right-5");

    editButton.append(editPic);
    trashBasket.append(trashBasketPic);

    for (let i = 0; i < Math.min(10, tweetsCollection.length); i++) {
      const elem = tweetsCollection[i];
      const tweet = document.createElement("section");
      const tweetInf = document.createElement("div");
      const username = document.createElement("span");
      const date = document.createElement("span");
      tweet.classList.add("tweet");
      tweetInf.classList.add("tweet-inf");

      username.innerText = `${elem.author}:`;
      username.classList.add("username");
      date.innerText = formatDate(elem.createdAt);
      tweetInf.append(username, date);
      if (elem.author === tweetsCollection.user) {
        tweetInf.append(editButton, trashBasket);
      } else {
        date.classList.add("margin-right-mixed");
      }

      const text = document.createElement("div");
      const twAnswers = document.createElement("div");
      const a = document.createElement("a");
      const retweet = document.createElement("img");
      const numberComments = document.createElement("p");

      text.classList.add("tweet-text");
      text.innerText = elem.text;
      twAnswers.classList.add("tweet-answers");
      a.href = "tweet.html";
      retweet.src = "pics/retweet.svg";
      retweet.classList.add("icon");
      a.append(retweet);
      numberComments.innerText = elem.comments.length;

      twAnswers.append(a, numberComments);

      tweet.append(tweetInf, text, twAnswers);
      tweetsList.append(tweet);
    }

    document.getElementById("commentForm").style.display = "none";
    document.getElementById("tweet-id").style.display = "none";
    document.getElementById("comments-id").style.display = "none";
    document.getElementById("refresh-button").style.display = "block";

    document.getElementById("inputSection").style.display = "block";
  }
}

function formatDate(date) {
  let dd = date.getDate();
  if (dd < 10) dd = `0${dd}`;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = `0${mm}`;

  let yy = date.getFullYear() % 100;
  if (yy < 10) yy = `0${yy}`;

  let hours = date.getHours();
  if (hours < 10) hours = `0${hours}`;

  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;

  return `${hours}:${minutes} ${dd}.${mm}.${yy}`;
}
