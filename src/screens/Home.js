import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {songs} from './MusicData';
import MusicListItem from '../common/MusicListItem';

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Music App</Text>
      </View>
      <FlatList
        data={songs}
        renderItem={({item, index}) => {
          return <MusicListItem item={item} index={index} data={songs} />;
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: 'white',
    width: '100%',
    elevation: 5,
    justifyContent: 'center',
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: 'red',
    marginLeft: 20,
  },
});
