import React, { useState, useEffect } from 'react';
import { Checkbox } from '@shopify/polaris';
import { getProductInfo, updateTrackingType } from '../utils/request.js';

class CheckTracking extends React.Component {
  constructor(props) {
    super(props);
    const { id } = props;
    const newId = id.split('/').pop();
    this.state = {
      isShow: true,
      id: newId,
    };
  }

  componentDidMount() {
    const { id } = this.state;
    getProductInfo(id, data => {
      const { product } = data;
      if (product) {
        this.setState({ isShow: product.isShow });
      }
    });
  }

  toggleTracking = () => {
    const { isShow, id } = this.state;
    const data = { isShow: !isShow };
    updateTrackingType(id, { data }, () => {
      this.setState({ isShow: !isShow });
    });
  };

  render() {
    const { isShow } = this.state;
    return <Checkbox label="Is Show Price History" checked={isShow} onChange={this.toggleTracking} />;
  }
}

export default CheckTracking;
