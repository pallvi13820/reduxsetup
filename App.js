import React from 'react';
import { Provider } from 'react-redux';


import store from './src/store/store';
import Firstrd from './src/screens/Firstrd';

const App = () => {
  return (
    <Provider store={store}>
      <Firstrd />
    </Provider>
  );
};

export default App;

