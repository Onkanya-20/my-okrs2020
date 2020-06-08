import React, { useState, useEffect } from 'react';
import Storage from './index.view';
import PropTypes from 'prop-types';

// import SharedComponent from './index.view';

// const SayHello = () => {
//   return <SharedComponent render={() => <span>Hello!</span>} />;
// };

// const SharedComponentWithGoofyName = props => {
//   console.log('Goofy Props ::', props);
//   return <div>{props.wrapThisThingInADiv()}</div>;
// };

// const SayHelloWithGoofyName = () => {
//   return (
//     <SharedComponentWithGoofyName
//       wrapThisThingInADiv={() => <span>Hello!!</span>}
//     />
//   );
// };

// const SECRET_TO_LIFE = 42;

// const SharedSecretLife = props => {
//   return <div>{props.render({ secretToLife: SECRET_TO_LIFE })}</div>;
// };

// const SharedSecretWithWorld = () => (
//   <SharedSecretLife
//     render={({ secretToLife }) => (
//       <h1>
//         <b>{secretToLife}</b>
//       </h1>
//     )}
//   />
// );

const StoragePropTypes = {
  load: PropTypes.func,
  save: PropTypes.func
};

const ComponentNeedingStorage = ({ save, load }) => {
  const [username, setUsername] = useState('');
  const [favoriteMovie, setFavoriteMovie] = useState('');

  const usernameObj = load('username');
  const favoriteMovieObj = load('favoriteMovie');
  const fetchData = () => {
    save('username', 'Onkanya');
    save('favoriteMovie', 'Zoothopia');

    setUsername(usernameObj);
    setFavoriteMovie(favoriteMovieObj);
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div>
      My username is {username}, and I love to watch {favoriteMovie}
    </div>
  );
};

ComponentNeedingStorage.propTypes = StoragePropTypes;

const WrapperComponent = () => {
  return (
    <Storage
      render={({ save, load }) => {
        return <ComponentNeedingStorage load={load} save={save} />;
      }}
    />
  );
};
export default WrapperComponent;
