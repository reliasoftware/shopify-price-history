import React, { useState } from 'react';
import { Checkbox } from '@shopify/polaris';

const CheckTracking = ({ isTracking, id }) => {
  const [isTrackingValue, toggleTracking] = useState(isTracking);
  return <Checkbox label="Is Tracking" checked={isTrackingValue} onChange={() => toggleTracking(!isTrackingValue)} />;
};

export default CheckTracking;
