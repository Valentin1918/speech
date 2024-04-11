import {useEffect, useState} from 'react';
import { PlayingState, createSpeechEngine } from './speech';
import {makeRanges} from "../utils/makeRanges";

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.

  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/

const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentSentenceWordIdx, setCurrentSentenceWordIdx] = useState(0);
  const [controls, setControls] = useState<{ play: () => void; pause: () => void; }>();
  const [playbackState, setPlaybackState] = useState<PlayingState>('paused');
  const sentencesRanges = makeRanges(sentences);

  useEffect(() => {

    const {
      play,
      pause,
      load
    } = createSpeechEngine({
      onBoundary: ({ charIndex }) => {
        const sentenceIndex = sentencesRanges.findIndex(({ from, to }) => charIndex >= from && charIndex <= to);
        setCurrentSentenceIdx(sentenceIndex);

        const charactersLeft = sentencesRanges[sentenceIndex].from;
        const wordsRanges = makeRanges(sentences[sentenceIndex].split(' '));
        const charIndexInWord = charIndex - charactersLeft;
        const wordIndex = wordsRanges.findIndex(({ from, to }) => charIndexInWord >= from && charIndexInWord <= to)
        setCurrentSentenceWordIdx(wordIndex);
      },
      onEnd: () => {},
      onStateUpdate: (state: PlayingState) => setPlaybackState(state),
    })

    setControls({ play, pause });
    load(sentences.join(' '));

  }, [sentences]);

  return {
    currentSentenceIdx,
    currentSentenceWordIdx,
    playbackState,
    ...controls,
  };
};

export default useSpeech;
