import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { flipCard } from './gameSlice';
import './MemoryGame.css';

export const MemoryGame = () => {
  const cards = useAppSelector(state => state.game.gameDeck);
  const dispatch = useAppDispatch();

  return (
    <div className='card-container'>
      {cards.map(card => (
        <div
          key={card.id}
          className={`card ${card.facedUp ? 'card-face-up' : ''}`}
          onClick={() => dispatch(flipCard(card.id))}
        >
            {card.facedUp ? <img className='card-image' src={`/${card.image}`} alt={`Card ${card.id}`} /> : '🟥'}
        </div>
      ))}
    </div>
  );
};
