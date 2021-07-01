import { useState, createContext, useEffect } from "react";
import useSWR from "swr";
import fetcher from "../utils/fetcher";

const MusicPlayerContext = createContext([{}, () => {}]);

const MusicPlayerProvider = (props) => {
  const [state, setState] = useState({});

  const { data: allTracks } = useSWR("/api/getData", fetcher);

  useEffect(async () => {
    (await allTracks) &&
      setState({
        allTracks,
        isPlaying: false,
        selectedTrack: null,
      });
  }, [allTracks]);
  // console.log(state);

  return (
    <MusicPlayerContext.Provider value={[state, setState]}>
      {props.children}
    </MusicPlayerContext.Provider>
  );
};

export { MusicPlayerContext, MusicPlayerProvider };
