import { PlayingState } from '../lib/speech';

/*
 * Implement a component that provides basic UI options such as playing, pausing and loading new content
 * This component should have the following,
 * - A button with text "Play" if the player is not playing
 * - A button with text "Pause" if the player is playing
 * - A button with text "Load new content" that loads new content from the API
 */
export const Controls = ({
  play,
  pause,
  stop,
  loadNewContent,
  playbackState,
}: {
  play: () => void;
  pause: () => void;
  stop: () => void;
  loadNewContent: () => void;
  playbackState: PlayingState;
}) => {
  return (
    <div>
      {(playbackState === 'playing') ? (
        <button onClick={pause}>
          Pause
        </button>
      ) : (
        <button onClick={play}>
          Play
        </button>
      )}

      <button onClick={loadNewContent}>
        Load new content
      </button>
    </div>
  );
};
