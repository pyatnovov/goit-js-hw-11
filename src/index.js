import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import PictureService from './js/picture-service';
import renderCard from './js/renderCard';


const refs = {
  form: document.getElementById('search-form'),
  input: document.querySelector('[type=text]'),
  submitBtn: document.querySelector('[type=submit]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const pictureService = new PictureService();


refs.submitBtn.addEventListener('click', onSubmitBtnClick);
refs.loadMoreBtn.addEventListener('click', loadMore);
refs.loadMoreBtn.classList.add('visually-hidden');

async function onSubmitBtnClick(e) {
  e.preventDefault();
  clearGallery();
  pictureService.value = refs.input.value;
  pictureService.resetPage();
  await pictureService.fetchPicture().then(apppendCardsMarkup);
  refs.loadMoreBtn.classList.remove('visually-hidden');
}

async function loadMore() {
  await pictureService.fetchPicture().then(apppendCardsMarkup);
}

function apppendCardsMarkup(arr) {
  refs.gallery.insertAdjacentHTML('beforeend', renderCard(arr));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
