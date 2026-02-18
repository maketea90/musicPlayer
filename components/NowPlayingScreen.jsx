import {View, Text, StyleSheet, Image, Pressable, Dimensions, } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { usePlayer } from './PlayerContext';
import ProgressBar from './ProgressBar';

const {width, height} = Dimensions.get('screen')

export default function NowPlayingScreen() {

    const {player, status, state} = usePlayer()

    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)

    useEffect(() => {
      if(Math.floor(status?.currentTime % 60) < 10){
        setSeconds(`0${Math.floor(status?.currentTime % 60)}`)
      } else {
        setSeconds(`${Math.floor(status?.currentTime % 60)}`)
      }
      setMinutes(`${Math.floor(status?.currentTime / 60)}`)
      // const currentSeconds = `${Math.floor}`
    }, [status?.currentTime])

     const navigation = useNavigation();

     const reverse = () => {
        player.seekTo(0)
        player.play()
     }
     const playPause = () => {
        status?.playing ? player.pause() : player.play()
     }
     const skip = () => {

     }

     const totalSeconds = status?.duration
    //  const progressSeconds = status?.currentTime

  return (
    <View style={styles.container}>
  
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.chevron}>˅</Text>
        </Pressable>
        <Text style={styles.playingFrom}>PLAYING FROM YOUR LIBRARY</Text>
        <View style={{ width: 24 }} />
      </View>

  
      <View style={styles.artworkWrapper}>
        <Image
          source={require('../assets/album_artwork/cat.jpg')}
          style={[styles.artwork, {width: '100%', height: '85%'}]}
        />
      </View>

   
      <View style={styles.trackInfo}>
        <View>
          <Text style={styles.title} numberOfLines={1}>
            {state.data.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {state.data.artist}
          </Text>
        </View>

        <Pressable>
          <Text style={styles.like}>♡</Text>
        </Pressable>
      </View>

    
      <View style={styles.progressSection}>
        {/* <View style={styles.progressBar}> */}
        <ProgressBar duration={status?.duration} player={player} status={status} id={state.data.id}/>
        {/* </View> */}
        <View style={styles.timeRow}>
          <Text style={styles.time}>{`${minutes}:${seconds}`}</Text>
          <Text style={styles.time}>{Math.floor(totalSeconds / 60)}:{Math.floor(totalSeconds % 60)}</Text>
        </View>
      </View>

     
      <View style={styles.controls}>
        <Pressable style={styles.control} onPress={reverse}>
          <Text style={styles.text}>⏮</Text>
        </Pressable>

        <Pressable style={styles.playButton} onPress={playPause}>
            <Text style={styles.playIcon}>{status?.playing ? '⏸' : '▶'}</Text>
        </Pressable>

        <Pressable style={styles.control} onPress={skip}>
          <Text style={styles.text}>⏭</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  chevron: {
    color: '#fff',
    fontSize: 26,
  },

  playingFrom: {
    color: '#aaa',
    fontSize: 11,
    letterSpacing: 1,
  },

  artworkWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  artwork: {
    width: '90%',
    aspectRatio: 1,
    borderRadius: 6,
  },

  trackInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },

  artist: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 2,
  },

  like: {
    color: '#1DB954',
    fontSize: 22,
  },

  progressSection: {
    marginBottom: 24,
  },

  progressBar: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    overflow: 'hidden',
  },

  progressFill: {
    width: '30%',
    height: '100%',
    backgroundColor: '#1DB954',
  },

  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },

  time: {
    color: '#fff',
    fontSize: 11,
  },

  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
    // marginHorizontal: 20
    gap: 36
  },

  control: {
    color: '#000',
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 24,
    // alignSelf: 'center'
    // flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  playIcon: {
    color: '#000',
    fontSize: 28,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 16,
  },

  bottomIcon: {
    color: '#888',
    fontSize: 18,
  },
});