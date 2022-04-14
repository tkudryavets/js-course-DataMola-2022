class FilterView {
  constructor(id) {
    this.id = id;
  }

  display(tweetsCollection) {
    const filterBox = document.getElementById(this.id);

    const divAuthors = document.createElement("div");
    divAuthors.classList.add("margin-top-3");
    divAuthors.innerHTML =
      '<label for="authors" class="margin-right-label">Автор</label>';
    divAuthors.insertAdjacentHTML(
      "beforeend",
      '<select name="authors" multiple size="1" aria-placeholder="Автор" id="authors" ></select>'
    );

    const datesDiv = document.createElement("div");
    datesDiv.insertAdjacentHTML(
      "beforeend",
      '<label class="margin-right-label">По дате добавления</label><div style="display: inline-block"><label for="since">С </label><input name="since" type="date" /></div>'
    );
    datesDiv.insertAdjacentHTML(
      "beforeend",
      '<div style="display: inline-block" class="margin-left-3"><label for="till">До </label><input name="till" type="date" /></div>'
    );

    const hashtagsDiv = document.createElement("div");
    hashtagsDiv.insertAdjacentHTML(
      "beforeend",
      '<label for="tags" class="margin-right-label">#Теги</label><select name="tags"><option value="1">#hashtag</option></select>'
    );

    const textDiv = document.createElement("div");
    textDiv.classList.add("margin-bottom-3");
    textDiv.insertAdjacentHTML(
      "beforeend",
      '<label for="text" class="margin-right-label">Текст</label><input placeholder="Введите текст" /><button class="orange-button">Применить</button>'
    );

    const filterButton = document.createElement("button");
    filterButton.id = "filter";
    filterButton.innerHTML =
      '<img src="pics/filter.svg" class="margin-auto icon" />';
    filterBox.append(divAuthors);
    filterBox.append(datesDiv);
    filterBox.append(hashtagsDiv);
    filterBox.append(textDiv);
    document
      .getElementById("filter-form")
      .insertAdjacentElement("afterend", filterButton);
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
