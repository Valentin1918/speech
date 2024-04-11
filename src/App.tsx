import {useEffect, useState} from "react";
import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import {fetchSentences} from "./api/fetchContent";
import useSpeech from "./lib/useSpeech";


function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const {
    currentSentenceIdx,
    currentSentenceWordIdx,
    playbackState,
    play,
    pause,
  } = useSpeech(sentences);

  const loadNewContent = () => {
    fetchSentences().then((sentences) => {
      setSentences(sentences);
    });
  }

  useEffect(() => {
    loadNewContent();
  }, []);

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading
          currentSentenceIdx={currentSentenceIdx}
          currentSentenceWordIdx={currentSentenceWordIdx}
          sentences={sentences}
          playbackState={playbackState}
        />
      </div>
      <div>
        <Controls
          play={play}
          pause={pause}
          playbackState={playbackState}
          loadNewContent={loadNewContent}
        />
      </div>
    </div>
  );
}

export default App;
