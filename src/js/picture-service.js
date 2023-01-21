import axios from 'axios';
export default class pictureApiService {
  constructor() {
    this.inputValue = '';
    this.KEY = '32926436-c6ecc5f5fc4edb6e5a87cae88';
    this.BASE_URL = 'https://pixabay.com/api/';
    this.page = 1;
    this.totalHits = 0;
    this.per_page = 40;
  }

  async fetchPicture() {
    const url = `${this.BASE_URL}?key=${this.KEY}&q=${this.inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

    try {
      const response = await axios.get(url);
      const totalHits = response.data.totalHits;
      this.incrementPage()
      this.totalHits = totalHits;
      return response.data.hits;
    } catch (error) {
      console.log(error);
    }
  }
  incrementPage() {
    this.page += 1;
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
