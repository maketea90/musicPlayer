import { View, StyleSheet, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, {useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import { useEffect } from 'react';

const { width } = Dimensions.get('screen')

const BAR_WIDTH = width*0.9

export default function ProgressBar({ duration, player, status, id }) {

  const progress = status?.duration && status?.currentTime ? status.currentTime/status.duration : 0

  const isPressed = useSharedValue(false);
  // const progress = useSharedValue(init)
  const offset = useSharedValue({ x: progress*BAR_WIDTH});
  const x = useSharedValue(0)

  // function clamp(val, min, max) {
  //   return Math.min(Math.max(val, min), max);
  // }

  useEffect(() => {
    start.value = {x: progress * BAR_WIDTH}
    offset.value = {x : progress * BAR_WIDTH}
      
  }, [status?.didJustFinish, id])

  useEffect(() => {
    if (!isPressed.value && status?.duration && status?.currentTime) {
      // progress.value = status.currentTime / status.duration;
      offset.value = {x: (status.currentTime/status.duration)*BAR_WIDTH}
    }
  }, [status?.currentTime]);

  const animatedStyles = useAnimatedStyle(() => {
        // progress.value = status?.duration && status?.currentTime ? status.currentTime/status.duration : 0

    return {
      transform: [
        { translateX: offset.value.x },
        // { translateX: progress*width }
        // { translateY: offset.value.y },
        // { scale: withSpring(isPressed.value ? 1.2 : 1) },
      ],
      backgroundColor: isPressed.value ? 'grey' : 'white',
    };
  });

  // const STARTING_COORDINATE = (width - BAR_WIDTH) / 2

  const start = useSharedValue({ x: progress*BAR_WIDTH });
  const gesture = Gesture.Pan()
    .onBegin(() => {
          // const progress = status?.duration && status?.currentTime ? status.currentTime/status.duration : 0
      
      isPressed.value = true;
    })
    .onUpdate((e) => {
      
    const newCoordinate = start.value.x + e.translationX*0.9

      if(e.translationX < 0){
        x.value = Math.max(0, newCoordinate)
      } else {
        x.value = Math.min(BAR_WIDTH, newCoordinate)
      }

      offset.value = {
        x: x.value
        // y: e.translationY + start.value.y,
      };
      // const x = Math.min(Math.max(e.translationX, 0), width);
      // progress.value = x / width;
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        // y: offset.value.y,
      };
    })
    .onFinalize(() => {
      const position = (offset.value.x/BAR_WIDTH)*duration
      // const position = progress.value * duration
      player.seekTo(position)
      player.play()
      isPressed.value = false;
    });

    const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onStart((e) => {
      console.log('Single tap!')
      // const x = 
      offset.value = { x : e.x }
      const position = (offset.value.x/BAR_WIDTH)*duration
      player.seekTo(position)
      player.play()
    })
    .onEnd(() => {
      start.value = { x : offset.value.x}
      
    });

     const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart((e) => {
      console.log('Double tap!');

      offset.value = { x: e.x}
      const position = (offset.value.x/BAR_WIDTH)*duration
      player.seekTo(position)
      player.play()
    })
    .onEnd(() => {
      start.value = { x: offset.value.x}
      
    })

    // style={[styles.fill, {width: `${progress * 100}%`}]} 
  return (
  <View style={styles.container}>
    <View style={styles.barContainer}>
      <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
      <View style={styles.fillBar}>
        <View style={[styles.fill, {width: `${progress*100}%`}]} />
      </View>
      </GestureDetector>

      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.ball, animatedStyles]} />
      </GestureDetector>
    </View>
  </View>
);
  
};

// const BAR_WIDTH = width;
const BALL_SIZE = 10;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center', 
  },

  barContainer: {
    width: BAR_WIDTH,
    position: 'relative', 
    marginTop: 10,
  },

  fillBar: {
    height: 4,
    width: '100%',
    backgroundColor: '#807e7e',
    borderRadius: 2,
    overflow: 'hidden',
  },

  fill: {
    height: '100%',
    backgroundColor: '#fff',
  },

  ball: {
    // position: 'absolute',
    top: -6,
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE,
    backgroundColor: 'white',
  },
});

const before = StyleSheet.create({
  ball: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
  },
  container: {
    width,
    // justifyContent: 'center',
  },
  fillBar:{
    marginTop: 10,
    height: 4,
    width: '90%',
    backgroundColor: '#807e7e',
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#fff',
  }
  // container: {
  //   marginTop: 10,
  //   height: 4,
  //   width: '100%',
  //   backgroundColor: '#807e7e',
  //   borderRadius: 2,
  //   overflow: 'hidden',
  // },
});
// const styles = StyleSheet.create({
//   container: {
//     marginTop: 10,
//     height: 4,
//     width: '100%',
//     backgroundColor: '#807e7e',
//     borderRadius: 2,
//     overflow: 'hidden',
//   },
//   fill: {
//     height: '100%',
//     backgroundColor: '#fff',
//   },
// });