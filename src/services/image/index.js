import { fetchPostFormData } from 'utils/services/fetch';
// import axios from 'axios';

export const uploadImage = (image, user_id) => {
  const url = 'https://image-upload-2020.herokuapp.com/image/create';
  return fetchPostFormData(url, {
    images: image,
    user_id
  }).then(response => response);
  // axios.post('https://image-upload-2020.herokuapp.com/image/create', data).then(res => res);
};
