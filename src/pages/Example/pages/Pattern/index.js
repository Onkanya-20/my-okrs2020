import React, { useState, useEffect } from 'react';
import withStorage from './index.view';

const ComponentNeedingStorage = props => {
  const [username, setUsername] = useState('');
  const [favoriteMovie, setFavoriteMovie] = useState('');

  useEffect(() => {
    handleState();
  }, []);

  const handleState = () => {
    const usernameObj = props.load('username');
    const favoriteMovieObj = props.load('favoriteMovie');
    setUsername(usernameObj);
    setFavoriteMovie(favoriteMovieObj);
  };
  return (
    <div>
      data ia {username} {favoriteMovie}
    </div>
  );
};

const WrappedComponent = withStorage(ComponentNeedingStorage);

export default WrappedComponent;
