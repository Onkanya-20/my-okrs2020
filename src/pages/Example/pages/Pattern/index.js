import React from 'react';
import withSecretToLife from './index.view';

const DisplayTheSecret = props => (
  <div>The secret to life is {props.secretToLife}.</div>
);

const WrappedComponent = withSecretToLife(DisplayTheSecret);

export default WrappedComponent;
