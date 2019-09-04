import React from 'react';
import { Line } from 'react-chartjs-2';
import { getPriceHistory } from '../app/src/utils/request.js';
import parseProductChart from './utils/parseProductChart';

const configChart = {
  label: 'Product History Chart',
  fill: false,
  lineTension: 0.1,
  backgroundColor: 'rgba(75,192,192,0.4)',
  borderColor: 'rgba(75,192,192,1)',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: 'rgba(75,192,192,1)',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  pointHoverBorderColor: 'rgba(220,220,220,1)',
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
  height: 200,
  width: 400,
};
class ChartPopup extends React.Component {
  constructor(props) {
    super(props);
    const dataChart = {
      labels: [],
      datasets: [
        {
          ...configChart,
          data: [],
        },
      ],
    };
    this.state = {
      dataChart,
    };
  }
  componentDidMount() {
    const { id, variant } = this.props;
    getPriceHistory(id, dataInput => {
      const { variants } = dataInput;
      Object.keys(variants).map(item => {
        variants[item] = parseProductChart(variants[item]);
      });
      const { labels, data } = variants[variant];
      this.setState({ variants, dataChart: { labels, datasets: [{ ...configChart, data }] } });
    });
  }

  render() {
    const { dataChart } = this.state;
    return (
      <Line
        width={700}
        height={300}
        data={dataChart}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function(value, index, values) {
                    return '$' + new Intl.NumberFormat().format(Math.round(value));
                  },
                },
              },
            ],
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                  label += ': $';
                }
                label += new Intl.NumberFormat().format(Math.round(tooltipItem.yLabel * 100) / 100);
                return label;
              },
            },
          },
        }}
      />
    );
  }
}

export default ChartPopup;
