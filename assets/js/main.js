const searchField = document.querySelector('#search');
const imagesContainer = document.querySelector('.app__main');
const searchIcon = document.querySelector('.icon__search');
const clearIcon = document.querySelector('.icon__clear');
let searchString = 'summer';
let request = '';

function getSearchData() {
  if (searchField.value) {
    searchString = searchField.value.toLowerCase();
    searchField.focus();
  }

  return searchString;
}

function renderImage(data) {
  imagesContainer.innerHTML = '';

  data.forEach(el => {
    let image = new Image();
    image.classList.add('app__image');
    image.setAttribute('src', el.urls.small);

    imagesContainer.append(image);
  });
}

async function makeRequest() {
  let url = `https://api.unsplash.com/search/photos?query=${getSearchData()}&per_page=12&orientation=landscape&client_id=hY8KZQ8ht5zEI50zcGXnL9xiK5reJSbxEdJ7BWwbSO4`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.results.length === 0) {
    imagesContainer.textContent = `We can't find any photo`;
  } else {
    let renderData = data.results;

    renderImage(renderData);
  }
}

function clearSearchField() {
  if (searchField.value !== 0) {
    searchField.value = '';
    searchIcon.classList.add('active');
    clearIcon.classList.remove('active');
  }
}

function toggleSearchFieldIcon() {
  if (searchField.value.length !== 0) {
    searchIcon.classList.remove('active');
    clearIcon.classList.add('active');
  } else {
    searchIcon.classList.add('active');
    clearIcon.classList.remove('active');
  }
}

document.addEventListener('DOMContentLoaded', makeRequest);
window.addEventListener('load', () => {
  searchField.focus();
});
searchField.addEventListener('input', toggleSearchFieldIcon);
clearIcon.addEventListener('click', clearSearchField);
searchIcon.addEventListener('click', e => {
  e.preventDefault();
  makeRequest();
});
window.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    makeRequest();
  }
});

console.log(`
Ваша оценка - 60 баллов
Отзыв по пунктам ТЗ:
Не выполненные/не засчитанные пункты:
1) Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения

Выполненные пункты:
1) на странице есть несколько фото и строка поиска

2) в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс

3) При загрузке приложения на странице отображаются полученные от API изображения

4) Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API

5) при открытии приложения курсор находится в поле ввода

6) есть placeholder

7) автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами)

8) поисковый запрос можно отправить нажатием клавиши Enter

9) после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода

10) в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder


  `);
