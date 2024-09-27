const searchField = document.querySelector('#search');
const imagesContainer = document.querySelector('.app__main');
const searchIcon = document.querySelector('.icon__search');
const clearIcon = document.querySelector('.icon__clear');
let searchString = 'summer';

function getSearchData() {
  if (searchField.value) {
    searchString = searchField.value.toLowerCase();
    searchField.value = '';
  }

  return searchString;
}

function renderImage(data) {
  imagesContainer.innerHTML = '';

  data.forEach(el => {
    console.log(el.urls.full);

    let image = new Image();
    // image.setAttribute.alt = `${el.alt_description}`;
    image.classList.add('app__image');
    image.setAttribute('src', el.urls.small);

    // image.addEventListener('load', () => {
    //   image.setAttribute('src', el.urls.full);
    // });

    imagesContainer.append(image);
  });
}

async function makeRequest() {
  let url = `https://api.unsplash.com/search/photos?query=${getSearchData()}&per_page=12&orientation=landscape&client_id=hY8KZQ8ht5zEI50zcGXnL9xiK5reJSbxEdJ7BWwbSO4`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.results.length === 0) {
    console.log(`We can't find any photo`);
    imagesContainer.textContent = `We can't find any photo`;
  } else {
    let renderData = data.results;

    renderImage(renderData);
    console.log(renderData);
  }
}

// searchIcon.addEventListener('click', getSearchData);
document.addEventListener('DOMContentLoaded', makeRequest);
searchIcon.addEventListener('click', makeRequest);

// makeRequest();
