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

// import React, {useEffect, useState} from 'react';
// import {View, Image} from 'react-native';
// import MapView, {Marker, Polyline} from 'react-native-maps';
// import SplashScreen from 'react-native-splash-screen';
// import Geolocation from '@react-native-community/geolocation';
// import MapViewDirections from 'react-native-maps-directions';

// const App = () => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [destinationLocation, setDestinationLocation] = useState({
//     latitude: 30.6811011,
//     longitude: 76.7357803,
//   });

//   useEffect(() => {
//     SplashScreen.hide();

//     Geolocation.getCurrentPosition(
//       position => {
//         const {latitude, longitude} = position.coords;
//         setCurrentLocation({latitude, longitude});
//       },
//       error => console.log(error),
//       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
//     );
//   }, []);

//   const origin = {latitude: 30.6575589, longitude: 76.7245736};
//   const destination = {latitude: 30.6735755, longitude: 76.7376952};
//   const GOOGLE_MAPS_APIKEY = 'AIzaSyBbytCk92gm3MK3Mrs_374RDKf4bz0X1ck';

//   return (
//     <View style={{flex: 1}}>
//       <MapView
//         showsUserLocation={true}
//         showsMyLocationButton={true}
//         followsUserLocation={true}
//         showsCompass={true}
//         scrollEnabled={true}
//         zoomEnabled={true}
//         pitchEnabled={true}
//         rotateEnabled={true}
//         style={{flex: 1}}
//         initialRegion={{
//           latitude: 30.6575589,
//           longitude: 76.7245736,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}>
//         {currentLocation && (
//           <>
//             <Marker
//               title="You are here"
//               description="This is your current location"
//               coordinate={{
//                 latitude: 30.6575589,
//                 longitude: 76.7245736,
//               }}>
//               <Image
//                 source={require('./src/Images/marker.png')}
//                 style={{width: 40, height: 40}}
//               />
//             </Marker>
//             <Marker
//               title="Destination"
//               description="This is your destination location"
//               coordinate={{
//                 latitude: 30.6735755,
//                 longitude: 76.7376952,
//               }}>
//               <Image
//                 source={require('./src/Images/marker.png')}
//                 style={{width: 40, height: 40}}
//               />
//             </Marker>
//             <MapViewDirections
//               origin={origin}
//               destination={destination}
//               apikey={GOOGLE_MAPS_APIKEY}
//               strokeWidth={3}
//               strokeColor="blue"
//             />
//           </>
//         )}
//       </MapView>
//     </View>
//   );
// };

// export default App;

import React, {useEffect, useState} from 'react';
import {View, Image, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import SplashScreen from 'react-native-splash-screen';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';

const App = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const destinationLocation = {latitude: 30.6735755, longitude: 76.7376952};

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

  useEffect(() => {
    if (currentLocation) {
      const distance = calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        destinationLocation.latitude,
        destinationLocation.longitude,
      );
      console.log('Distance to destination:', distance);
      if (distance <= 300) {
        // Adjusted threshold to 300 meters
        console.log('Alerting user');
        Alert.alert('Alert', 'You are near the destination!');
      }
    }
  }, [currentLocation]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance; // in meters
  };

  const origin = {latitude: 30.6575589, longitude: 76.7245736};
  const destination = {latitude: 30.6735755, longitude: 76.7376952};
  const GOOGLE_MAPS_APIKEY = 'AIzaSyBbytCk92gm3MK3Mrs_374RDKf4bz0X1ck';

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
                latitude: 30.6735755,
                longitude: 76.7376952,
              }}>
              <Image
                source={require('./src/Images/marker.png')}
                style={{width: 40, height: 40}}
              />
            </Marker>
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="blue"
            />
          </>
        )}
      </MapView>
    </View>
  );
};

export default App;
