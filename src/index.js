import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
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
let lightbox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.submitBtn.addEventListener('click', onSubmitBtnClick);
refs.loadMoreBtn.addEventListener('click', loadMore);
refs.loadMoreBtn.classList.add('visually-hidden');
function onSubmitBtnClick(e) {

    e.preventDefault();

    clearGallery();
    pictureService.value = refs.input.value;

    pictureService.resetPage();

    lightbox.refresh();
    pictureService.fetchPicture().then(array => {
    if (array.length === 0) {
    refs.loadMoreBtn.classList.add('visually-hidden');        
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

      pictureService.fetchPicture().then(apppendCardsMarkup);

    if (pictureService.page === 2) {
        refs.loadMoreBtn.classList.remove('visually-hidden');
        Notify.success(
          `Hooray! We found ${pictureService.totalHits} images.`
        );
      }

    });
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
