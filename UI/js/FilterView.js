class FilterView {
  constructor(id) {
    this.id = id;
  }

  display(tweetsCollection) {
    const filterBox = document.getElementById(this.id);

    const authors = filterBox.children[0].children[1];
    const hashtags = filterBox.children[2].children[1];
    const authorSet = new Set();
    const hashtagsSet = new Set();
    const regexpHashtag = /#[а-яА-ЯёЁA|\w]{0,30}/g;

    tweetsCollection.forEach((element) => {
      authorSet.add(element.author);
      let matchAll = element.text.matchAll(regexpHashtag);
      matchAll = Array.from(matchAll);
      matchAll.forEach((el) => {
        hashtagsSet.add(el);
      });
    });
    authorSet.forEach((value, valueAgain, set) => {
      const option = document.createElement("option");
      option.innerText = value;
      authors.append(option);
    });

    hashtagsSet.forEach((value, valueAgain, set) => {
      const option = document.createElement("option");
      option.innerText = value;
      hashtags.append(option);
    });
  }
}
