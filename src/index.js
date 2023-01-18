import simplelightbox from "simplelightbox";
import PictureService from "./picture-service";
import renderCard from "./renderCard";

const refs = {
  form: document.getElementById('search-form'),
  input: document.querySelector('[type=text]'),
  submitBtn: document.querySelector('[type=submit]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
const pictureService = new PictureService();

refs.submitBtn.addEventListener("click", onSubmitBtnClick);
refs.loadMoreBtn.addEventListener("click", loadMore);

function onSubmitBtnClick(e) {
  e.preventDefault();
  clearGallery();
  pictureService.value = refs.input.value;
  pictureService.resetPage();
  pictureService.fetchPicture().then(apppendCardsMarkup);
  
}

function loadMore() {
  pictureService.fetchPicture().then(apppendCardsMarkup);
}


function apppendCardsMarkup(arr) {
  refs.gallery.insertAdjacentHTML('beforeend', renderCard(arr));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}


