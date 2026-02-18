import { View, StyleSheet, Button, Text, TextInput, Pressable } from 'react-native';
import AudioList from './AudioList'
import { useState } from 'react';
import SearchBar from './SearchBar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const music = [
        {
            id: 1,
            title: 'moonlight sonata',
            artist: 'Beethoven',
            file: require('../assets/music/moonlight_sonata.mp3')
        },
        {
            id: 2,
            title: 'adagio in B minor',
            artist: 'Mozart',
            file: require('../assets/music/mozart_adagio.mp3')
        },
        {
            id: 3,
            title: 'aria',
            artist: 'Bach',
            file: require('../assets/music/bach_aria.mp3')
        },
        {
          id: 4,
          title: '3rd movement',
          artist: 'Beethoven',
          file: require('../assets/music/moonlight_3rd_movement.mp3')
        },
        {
          id: 5,
          title: 'the nutcracker suite act 1 pt 7',
          artist: 'Tchaikovsky',
          file: require('../assets/music/nutcracker.mp3')
        }

    ]

export default function HomeScreen() {
    const [tracks, setTracks] = useState(music)
    
      return (
        <GestureHandlerRootView>
        <View style={styles.container}>
        <SearchBar music={music} setTracks={setTracks}/>
        <AudioList music={music} filtered={tracks}/>
        </View>
        </GestureHandlerRootView>
      )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    // padding: 10,
  }
})