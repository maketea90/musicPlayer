import HomeScreen from './components/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import NowPlayingScreen from './components/NowPlayingScreen';
import { NavigationContainer } from '@react-navigation/native';
import PlayerProvider from './components/PlayerContext';

const Stack = createStackNavigator()

export default function App() {

  return (
    <PlayerProvider>
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen
        name="nowPlaying"
        component={NowPlayingScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
    </NavigationContainer>
    </PlayerProvider>
  );
}