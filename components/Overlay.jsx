import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import ProgressBar from "./ProgressBar";
import { useEffect, useState } from "react";

export default function Overlay ({ id, music, status, player }) {
  if (!id) return null;

  // const [trackFinished, setTrackFinished] = useState(false)

  const track = music.filter((item) => item.id === id)[0]

  const progress = status?.duration && status?.currentTime ? status.currentTime/status.duration : 0

  const duration = status?.duration

  return (
    <View style={styles.miniPlayer}>
      {/* <Pressable style={styles.miniPlayer} onPress={() => {navigation.navigate('nowPlaying')}}> */}
      <View style={styles.info}>
      <View style={styles.picture}>
        <Image source={require('../assets/album_artwork/cat.jpg')} style={{width: 45, height: 45}}/>
      </View>
      <View style={styles.trackInfo}>
        <View style={styles.title}>
          <Text style={styles.title}>{track.title} · <Text style={[styles.title, {fontWeight: '300'}]}>{track.artist}</Text></Text>       
        </View>
        <View style={styles.fillBar}>
            <View style={[styles.fill, {width: `${progress*100}%`}]} />
        </View>
      </View>
        {/* <Text style={styles.trackArtist} numberOfLines={1}>
          {track.artist}
        </Text> */}
        {/* <ProgressBar style={styles.progress} id={id} progress={progress} duration={duration} player={player} status={status}/> */}
      </View>
      
      <View style={styles.button}>
      <Pressable
        onPress={(e) => {
          e.stopPropagation()
          if(status?.didJustFinish){
            player.seekTo(0)
            player.play()
          } else {
            status?.playing ? player.pause() : player.play()
          }
        }
          
        }
      >
        <Text style={styles.control}>
          {status?.playing ? '⏸' : '▶'}
        </Text>
      </Pressable>
      </View>
      {/* </Pressable> */}
    </View>
    
  );
};

const styles = StyleSheet.create({
  miniPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 12,
    backgroundColor: '#181818', 
    borderTopWidth: 0.5,
    borderTopColor: '#2a2a2a',
  },

  info: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },

  picture: {
    width: 30,
    height: 30,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },

  trackInfo: {
    flex: 1,
    justifyContent: 'space-between',
    height: 36, 
  },

  title: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },

  fillBar: {
    height: 2,
    width: '100%',
    backgroundColor: '#3a3a3a',
    borderRadius: 1,
    overflow: 'hidden',
  },

  fill: {
    height: '100%',
    backgroundColor: '#1DB954', 
  },

  button: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  control: {
    color: '#fff',
    fontSize: 22,
  },
})