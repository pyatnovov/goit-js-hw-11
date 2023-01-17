import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import simplelightbox from "simplelightbox";

const refs = {
form : document.getElementById('search-form'),
input : document.querySelector('[type=text]'),
submitBtn : document.querySelector('[type=submit]'),
}

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
            console.log(response);  
        }
      })
      .catch(error => {
        console.log(error);
      });    
   
}
refs.submitBtn.addEventListener("click", onSubmitBtnClick);

