import Board from './GameBoard';
import { AppWrapper } from './style';

const Game = () => {
  return (
    <AppWrapper>
      <Board rows={10} cols={10} mines={20} />
    </AppWrapper>
  );
};

export default Game;
