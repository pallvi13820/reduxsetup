import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TrackPlayer, {Capability} from 'react-native-track-player';
import {songs} from './MusicData';
const Music = ({route}) => {
  const data = route.params.data;

  useEffect(() => {
    setupPlayer();
  }, []);

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],

        compactCapabilities: [Capability.Play, Capability.Pause],
      });
      await TrackPlayer.add(songs);
    } catch (e) {
      console.log('e', e);
    }
  };
  return (
    <View style={styles.container}>
      <Image source={data?.artwork} style={styles.banner} />

      <Text style={styles.name}>{data?.title}</Text>
      <Text style={styles.name}>{data?.artist}</Text>
      <View style={styles.buttonarea}>
        <TouchableOpacity
          onPress={async () => {
            await TrackPlayer.skip(1);
            await TrackPlayer.play();
          }}>
          <Image source={require('../Images/play.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await TrackPlayer.skip(1);
            await TrackPlayer.pause();
          }}>
          <Image
            source={require('../Images/pause.png')}
            style={styles.iconnext}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  name: {
    marginTop: 10,
    fontSize: 20,
    color: '#000',
  },
  slider: {
    width: '80%',
    marginTop: 20,
  },
  thumb: {
    borderWidth: 2,
    borderColor: '#FF5733',
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  track: {
    height: 5,
    borderRadius: 5,
  },
  buttonarea: {flexDirection: 'row', alignItems: 'center', padding: 10},
  icon: {backgroundColor: 'pink', width: 50, height: 50},
  iconnext: {
    backgroundColor: 'pink',
    width: 50,
    height: 50,
    marginLeft: 10,
  },
});

export default Music;
