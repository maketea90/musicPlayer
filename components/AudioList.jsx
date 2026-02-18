import { useEffect, useState } from 'react'
import {View, StyleSheet, FlatList, } from 'react-native'
import { Pressable, Text } from 'react-native';
import Overlay from './Overlay';
import {useNavigation} from '@react-navigation/native';
import { usePlayer } from './PlayerContext';

export default function AudioList({music, filtered }){

    const {player, status, state} = usePlayer()

    const navigation = useNavigation()

    const [audioSource, setAudioSource] = useState(null)
    const [currentTrackId, setCurrentTrackId] = useState(0)

    useEffect(() => {
        player.replace(audioSource)
        while(!status.isLoaded){
            console.log('buffering')
        }
        if(audioSource) {
            console.log('playing')    
            player.play()
        }
    }, [audioSource])


    return(
        <View style={styles.container}>
        <FlatList
        data={filtered}
        renderItem={({item}) => {
            return(
                <Pressable onPress={() => {
                    
                    if(item.id === currentTrackId && !status.didJustFinish){
                        status.playing ? player.pause() : player.play()
                        return
                    } else if (item.id === currentTrackId && status.didJustFinish) {
                        player.seekTo(0)
                        player.play()
                        // player.pause()
                        
                    } else {
                        setCurrentTrackId(item.id)
                        setAudioSource(item.file)
                        state.setTrackData(item)
                    }
                }
                }>
                <View style={styles.item}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.artist}>{item.artist}</Text>
                </View>
                </Pressable>
            )
        }}
        style={{ flex: 1 }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{padding: 16}}
        />
        <Pressable onPress={() => {navigation.navigate('nowPlaying')}}>
        <Overlay style={styles.overlay} id={currentTrackId} music={music} status={status} player={player} />
        </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    margin: 5
    
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  artist: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});