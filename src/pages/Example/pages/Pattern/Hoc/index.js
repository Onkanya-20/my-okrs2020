import React, { useState, useEffect } from 'react';
import withStorage from './index.view';
import PropTypes from 'prop-types';

const StoragePropTypes = {
  load: PropTypes.func,
  save: PropTypes.func,
  remove: PropTypes.func
};

const ComponentNeedingStorage = ({ save, load }) => {
  const [username, setUsername] = useState('');
  const [favoriteMovie, setFavoriteMovie] = useState('');

  const usernameObj = load('username');
  const favoriteMovieObj = load('favoriteMovie');
  const handleData = () => {
    save('username', 'Onkanya');
    save('favoriteMovie', 'Zootopia');
    setUsername(usernameObj);
    setFavoriteMovie(favoriteMovieObj);
  };

  useEffect(() => {
    handleData();
  });

  return (
    <div>
      My username is {username}, and I love to watch {favoriteMovie}.
    </div>
  );
};

ComponentNeedingStorage.propTypes = StoragePropTypes;

const WrappedComponent = withStorage(ComponentNeedingStorage);

export default WrappedComponent;
