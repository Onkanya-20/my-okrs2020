import React, { useState, useEffect } from 'react';

const withStorage = WrappedComponent => {
  const HOC = props => {
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
    };

    useEffect(() => {
      checkLocalStorageExists();
    }, []);
    return <WrappedComponent {...props} load={load} />;
  };
  return HOC;
};

export default withStorage;
