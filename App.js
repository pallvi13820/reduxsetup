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
import MapView, {Marker, Polyline} from 'react-native-maps';
import SplashScreen from 'react-native-splash-screen';
import Geolocation from '@react-native-community/geolocation';

const App = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState({
    latitude: 30.6811011,
    longitude: 76.7357803,
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
          latitude: 30.6575589,
          longitude: 76.7245736,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {currentLocation && (
          <>
            <Marker
              title="You are here"
              description="This is your current location"
              coordinate={{
                latitude: 30.6575589,
                longitude: 76.7245736,
              }}>
              <Image
                source={require('./src/Images/marker.png')}
                style={{width: 40, height: 40}}
              />
            </Marker>
            <Marker
              title="Destination"
              description="This is your destination location"
              coordinate={{
                latitude: 30.6811011,
                longitude: 76.7357803,
              }}>
              <Image
                source={require('./src/Images/marker.png')}
                style={{width: 40, height: 40}}
              />
            </Marker>
            <Polyline
              coordinates={[
                {latitude: 30.6575589, longitude: 76.7245736},
                {latitude: 30.6811011, longitude: 76.7357803},
              ]}
              strokeColor="red"
              strokeWidth={2}
              lineDashPattern={[2]}
            />
          </>
        )}
      </MapView>
    </View>
  );
};

export default App;

// import {StyleSheet, Text, View} from 'react-native';
// import React, { useEffect } from 'react';
// import AppNavigator from './src/AppNavigator';
// import SplashScreen from 'react-native-splash-screen';
// const App = () => {

// useEffect(() => {
// SplashScreen.hide()
// }, [])

//   return <AppNavigator />;
// };

// export default App;

// const styles = StyleSheet.create({});
