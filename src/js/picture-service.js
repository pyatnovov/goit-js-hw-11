import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
export default class pictureApiService {
    constructor () {
        this.inputValue = '';
        this.KEY = '32926436-c6ecc5f5fc4edb6e5a87cae88';
        this.BASE_URL = 'https://pixabay.com/api/';
        this.page = 1;
    }

    async fetchPicture() {
      const response = await axios.get(
        `${this.BASE_URL}?key=${this.KEY}&q=${this.inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
      );
      try {
           if (response.data.hits.length === 0) {
             Notify.failure(
               'Sorry, there are no images matching your search query. Please try again.'
             );
           }
          else {
            this.page +=1;
            Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
            return response.data.hits;
            
           }        
      } catch(error) {
        console.log(error);
      }finally {
        if (response.data.totalHits === 0) {
             Notify.failure(
               "We're sorry, but you've reached the end of search results."
             );          
        } 
      }

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