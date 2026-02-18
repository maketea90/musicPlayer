import { createContext, useContext, useRef, useState, useEffect } from 'react';
// import { Audio } from 'expo-av';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

const PlayerContext = createContext(null);

export const usePlayer = () => useContext(PlayerContext);

export default function PlayerProvider({children}) {

    const setTrackData = (data) => {
    setState({ ...state, data })
    return state.data
  }

  const initState = {
    data: {},
    setTrackData,
  }

  const [state, setState] = useState(initState)

    const player = useAudioPlayer(null);
    const status = useAudioPlayerStatus(player);

    return(
        <PlayerContext.Provider value={{player, status, state}}>
            {children}
        </PlayerContext.Provider>
    )
}