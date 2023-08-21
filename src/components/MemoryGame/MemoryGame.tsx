import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setPendingFlip } from "../../features/memoryGame/gameSlice";
import { flipCardAndCheck } from "../../features/memoryGame/flipCardAndCheck";
import "./memoryGame.css";

export const MemoryGame = () => {
  const { gameDeck, pendingFlip } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const timeLimitReached = useAppSelector(
    (state) => state.controller.timeLimitReached
  );

  // if there is a pending flip, flip the card and check if it matches
  useEffect(() => {
    if (pendingFlip !== null) {
      dispatch(flipCardAndCheck());
    }
  }, [dispatch, pendingFlip]);

  // log the game deck to the console for debugging
  useEffect(() => {
    // console.log(gameDeck);
  }, [gameDeck]);

  return (
    <div className="card-container">
      {gameDeck.map((card) => (
        <div
          key={card.id}
          className={`card ${card.matched ? "card-matched" : ""}`}
          onClick={() => {
            if (!timeLimitReached) {
              // only allow card to be flipped if time limit has not been reached
              dispatch(setPendingFlip(card.id));
            }
          }}
        >
          {card.facedUp ? (
            <img
              className="card-image"
              src={card.image}
              alt={`Card ${card.id}`}
            />
          ) : (
            <img
              className="card-block"
              src={`${process.env.PUBLIC_URL}/assets/images/block.webp`}
              alt="Block Card"
            />
          )}
        </div>
      ))}
    </div>
  );
};
