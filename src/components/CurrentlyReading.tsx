import {PlayingState} from "../lib/speech";
import '../App.css';

/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = ({
  currentSentenceIdx,
  currentSentenceWordIdx,
  sentences,
  playbackState,
}: {
  currentSentenceIdx: number;
  currentSentenceWordIdx: number;
  sentences: string[];
  playbackState: PlayingState;
}) => {
  if (!sentences.length) return null;

  return (
    <div data-testid="currently-reading" className={playbackState === 'playing' ? 'currently-reading' : ''}>
      {sentences.map((sentence, sentenceIndex) => (
        <p
          data-testid={sentenceIndex === currentSentenceIdx ? 'current-sentence' : ''}
          className={sentenceIndex === currentSentenceIdx ? 'current-sentence' : ''}
          key={`sentence-${sentenceIndex}`}
        >
          {sentence.split(' ').map((word, wordIndex) => (
            <span
              data-testid={wordIndex === currentSentenceWordIdx ? 'current-word' : ''}
              className={wordIndex === currentSentenceWordIdx ? 'current-word' : ''}
              key={`sentence-${sentenceIndex}_word${wordIndex}`}
            >
              {`${word} `}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
};
