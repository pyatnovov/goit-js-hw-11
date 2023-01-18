import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
export default class pictureApiService {
    constructor () {
        this.inputValue = '';
        this.KEY = '32926436-c6ecc5f5fc4edb6e5a87cae88';
        this.BASE_URL = 'https://pixabay.com/api/';
        this.page = 1;
    }

    fetchPicture() {
         return axios.get(
           `${this.BASE_URL}?key=${this.KEY}&q=${this.inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
         )
         .then(response => {
           if (response.data.totalHits === 0) {
             Notify.failure(
               'Sorry, there are no images matching your search query. Please try again.'
             );
           } else {
            this.page +=1;
             return response.data.hits;
           }
         })
         .catch(error => {
           console.log(error);
         }); 
    }
    resetPage() {
        this.page = 1;
    }
    get value() {
        return this.inputValue;
    }

    set value(newValue) {
        this.inputValue = newValue;
    }
} 