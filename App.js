import React, { useEffect } from 'react';
import { Provider } from 'react-redux';


import store from './src/store/store';
import Firstrd from './src/screens/Firstrd';
import SplashScreen from 'react-native-splash-screen';

const App = () => {

useEffect(() => {
SplashScreen.hide()
}, [])


  return (
    <Provider store={store}>
      <Firstrd />
    </Provider>
  );
};

export default App;

