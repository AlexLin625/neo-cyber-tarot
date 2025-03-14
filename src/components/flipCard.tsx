import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { flipCard } from "../states/spreadStateSlice";
import type { RootState } from "../states/store";
import { TarotDB } from "../utils/tarotDatabase";

export function FlipCard({
  index,
}: {
  index: number;
}): React.ReactElement {
  const spreadState = useSelector(
    (state: RootState) => state.spreadState
  );
  const dispatch = useDispatch();
  const cardInstance = spreadState.selectedTarots[index];
  const name = cardInstance.name;
  const orientation = cardInstance.orientation;

  const flipped = spreadState.flipped[index];

  const handleClick = () => {
    if (!flipped) dispatch(flipCard(index));
  };

  return (
    <div
      onClick={handleClick}
      className="py-8 lg:py-2 px-5 flex flex-col items-center"
    >
      <div className="card shadow-lg hover:shadow-xl duration-300">
        <div
          className={`card-inner ${
            flipped ? "flipped" : ""
          }`}
        >
          <div className="card-front">
            <img src="/img/back.jpg" />
          </div>
          <div className={`card-back ${orientation}`}>
            <img src={TarotDB.image(name)} />
          </div>
        </div>
      </div>

      <p
        className={
          "card-text" + (flipped ? " flipped" : "")
        }
      >
        {TarotDB.query(cardInstance.name).name +
          (cardInstance.orientation === "upright"
            ? ""
            : " (逆位)")}
      </p>
    </div>
  );
}
