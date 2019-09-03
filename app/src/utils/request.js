import axios from 'axios';

export const getPriceHistory = (id, cb) => {
  axios.get(`https://2db69d73.ngrok.io/api/v1/product/${id}`).then(res => {
    console.info('data', res.data);
    const { data } = res.data;
    cb(data);
  });
};
