import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43801311-7231ce11da623161c2dfbe05c';

async function searchImages(query, page = 1, per_page = 15) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page,
    page,
  });

  const { data } = await axios.get(`${BASE_URL}?${params}`);
  // console.log('data', data);

  return data;
}

export { searchImages };
