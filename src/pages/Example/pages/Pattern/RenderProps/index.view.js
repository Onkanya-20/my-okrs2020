import React, { useState, useEffect } from 'react';

// const SharedComponent = props => {
//   return <div>{props.render()}</div>;
// };

const Storage = props => {
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
      {props.render({
        load: load,
        save: save,
        remove
      })}
    </span>
  );
};

export default Storage;
