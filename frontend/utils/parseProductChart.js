import moment from 'moment';
export default dataInput => {
  const labels = [];
  const data = [];
  dataInput.map(({ price, updatedAt }) => {
    const label = moment(updatedAt).format('MM-DD-YYYY:HH:mm');
    labels.push(label);
    data.push(price);
  });
  return { labels, data };
};
