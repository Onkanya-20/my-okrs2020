import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// const SharedComponent = props => {
//   return <div>{props.render()}</div>;
// };
const StoragePropTypes = {
  render: PropTypes.func
};
const Storage = ({ render }) => {
  const [localStorageAvailable, setLocalStorageAvailable] = useState(false);

  const checkLocalStorageExists = () => {
    const testKey = 'test';

    try {
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      setLocalStorageAvailable(true);
    } catch (e) {
      setLocalStorageAvailable(false);
    }
  };

  const load = key => {
    if (localStorageAvailable) {
      return localStorage.getItem(key);
    }

    return null;
  };

  const save = (key, data) => {
    if (localStorageAvailable) {
      localStorage.setItem(key, data);
    }
  };

  const remove = key => {
    if (localStorageAvailable) {
      localStorage.removeItem(key);
    }
  };

  useEffect(() => {
    checkLocalStorageExists();
  });

  return (
    <span>
      {render({
        load,
        save,
        remove
      })}
    </span>
  );
};

Storage.propTypes = StoragePropTypes;

export default Storage;
