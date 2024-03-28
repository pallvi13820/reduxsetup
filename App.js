// import React, { useEffect } from 'react';
// import { Provider } from 'react-redux';

// import store from './src/store/store';
// import Firstrd from './src/screens/Firstrd';
// import SplashScreen from 'react-native-splash-screen';

// const App = () => {

// useEffect(() => {
// SplashScreen.hide()
// }, [])

//   return (
//     <Provider store={store}>
//       <Firstrd />
//     </Provider>
//   );
// };

// export default App;

import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import SplashScreen from 'react-native-splash-screen';
import Geolocation from '@react-native-community/geolocation';

const customMarkerImage = require('./path/to/your/customMarker.png');

const App = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    SplashScreen.hide();

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  console.log(currentLocation);
  return (
    <View style={{flex: 1}}>
      <MapView
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        style={{flex: 1}}
        initialRegion={{
          latitude: currentLocation ? currentLocation.latitude : 37.78825,
          longitude: currentLocation ? currentLocation.longitude : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {currentLocation && (
          <Marker
            title="Yor are here"
            description="This is a description"
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}>
            <Image
              source={require('./src/Images/marker.png')}
              style={{width: 40, height: 40}}
            />
          </Marker>
        )}
      </MapView>
    </View>
  );
};

export default App;
