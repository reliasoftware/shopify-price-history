import React, { Fragment } from 'react';
import { Button, Popover, Stack } from '@shopify/polaris';
import CheckTracking from './CheckTracking';
import { Line } from 'react-chartjs-2';
import { getPriceHistory } from '../utils/request.js';
import parseProductChart from '../utils/parseProductChart';

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
class PopoverExample extends React.Component {
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
      active: false,
      dataChart,
      isHasHistory: 1,
      id: null,
      isTracking: true,
    };
  }
  componentDidMount() {
    const { id } = this.props;
    const newId = id.split('/').pop();
    getPriceHistory(newId, dataInput => {
      const { labels, data } = parseProductChart(dataInput);
      this.setState({
        isHasHistory: dataInput.length,
        isTracking: dataInput.length > 0 ? dataInput[0].isTracking : true,
        id: newId,
        dataChart: {
          labels,
          datasets: [
            {
              ...configChart,
              data,
            },
          ],
        },
      });
    });
  }

  togglePopover = () => {
    this.setState(({ active }) => {
      return { active: !active };
    });
  };

  render() {
    const activator = <Button onClick={this.togglePopover}>Price History</Button>;
    const { dataChart, isHasHistory, id, isTracking } = this.state;
    return (
      <Stack>
        <Stack.Item>
          <Popover active={this.state.active} activator={activator} onClose={this.togglePopover}>
            <div style={{ width: '400px' }}>
              {isHasHistory > 0 && <Line data={dataChart} />}
              {isHasHistory == 0 && (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <p>There is no price history</p>
                </div>
              )}
            </div>
          </Popover>
        </Stack.Item>
        <Stack.Item>
          <CheckTracking id={id} isTracking={isTracking} />
        </Stack.Item>
      </Stack>
    );
  }
}

export default PopoverExample;
