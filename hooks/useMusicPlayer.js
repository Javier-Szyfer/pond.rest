import { useContext } from "react";
import { MusicPlayerContext } from "../context/AudioContext";

const useMusicPlayer = () => {
  const [state, setState] = useContext(MusicPlayerContext);

  function playTrack(track) {
    setState({
      ...state,
      isPlaying: true,
      selectedTrack: track,
    });
  }

  //when closing player set track data to null
  function setTrackData(track) {
    setState({
      ...state,
      isPlaying: false,
      selectedTrack: track,
    });
  }
  // to change playing status from player component
  function setIsPlaying(status) {
    setState({
      ...state,
      isPlaying: status,
    });
  }

  return {
    isPlaying: state.isPlaying,
    setIsPlaying,
    playTrack,
    selectedTrack: state.selectedTrack,
    setTrackData,
  };
};

export default useMusicPlayer;
