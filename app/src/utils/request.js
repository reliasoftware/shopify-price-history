import axios from 'axios';

const URL = 'https://8b681492.ngrok.io/api/v1/product/';
export const getPriceHistory = (id, cb) => {
  axios.get(`${URL}${id}`).then(res => {
    cb(res.data);
  });
};

export const updateTrackingType = (id, data, cb) => {
  axios.post(`${URL}${id}`, data).then(res => {
    cb(res.data);
  });
};
