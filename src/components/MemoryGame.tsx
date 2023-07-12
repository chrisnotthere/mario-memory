import { useAppDispatch, useAppSelector } from "../app/hooks";
import { flipCard } from "../features/memoryGame/gameSlice";
import "../styles/memoryGame.css";

export const MemoryGame = () => {
  const cards = useAppSelector((state) => state.game.gameDeck);
  const dispatch = useAppDispatch();

  console.log(cards)

  return (
    <div className="card-container">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`card ${card.facedUp ? "card-face-up" : ""}`}
          onClick={() => dispatch(flipCard(card.id))}
        >
          {card.facedUp ? (
            <img
              className="card-image"
              src={`/${card.image}`}
              alt={`Card ${card.id}`}
            />
          ) : (
            <img
              src="/assets/images/block.webp"
              alt="Mario Block"
              width={"80px"}
            />
          )}
        </div>
      ))}
    </div>
  );
};
