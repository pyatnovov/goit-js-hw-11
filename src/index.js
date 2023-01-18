import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import simplelightbox from "simplelightbox";

const refs = {
  form: document.getElementById('search-form'),
  input: document.querySelector('[type=text]'),
  submitBtn: document.querySelector('[type=submit]'),
  gallery: document.querySelector('.gallery'),
};

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32926436-c6ecc5f5fc4edb6e5a87cae88';


function onSubmitBtnClick(e) {
    e.preventDefault();

    const inputValue = refs.input.value;

    return axios.get(`${BASE_URL}?key=${KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true`)
      .then(response => {
        if (response.data.totalHits === 0) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {
          renderCard(response.data.hits)
          refs.gallery.insertAdjacentHTML(
            'beforeend',
            renderCard(response.data.hits)
          );
        }
      })
      .catch(error => {
        console.log(error);
      });    
   
}
refs.submitBtn.addEventListener("click", onSubmitBtnClick);


function renderCard(arr) {
  return arr.map(item => {
    return `<div class="photo-card">
      <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes${item.likes}</b>
        </p>
        <p class="info-item">
          <b>Views${item.views}</b>
        </p>
        <p class="info-item">
          <b>Comments${item.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads${item.downloads}</b>
        </p>
      </div>
    </div>`;
  }).join('');
}

