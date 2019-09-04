import axios from 'axios';
const HOST = process.env.HOST;
const URL = `${HOST}/api/v1/product/`;
export const getProductInfo = (id, cb) => {
  axios.get(`${URL}${id}`).then(res => {
    cb(res.data);
  });
};

export const updateTrackingType = (id, data, cb) => {
  axios.post(`${URL}${id}`, data).then(res => {
    cb(res.data);
  });
};

export const getPriceHistory = (id, cb) => {
  axios.get(`${URL}${id}/prices`).then(res => {
    cb(res.data);
  });
};
