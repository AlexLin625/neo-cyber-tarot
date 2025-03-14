import { TarotDB } from "../utils/tarotDatabase";
import React from "react";
import { WordCloud } from "./wordCloud";
import Markdown from "react-markdown";

function TarotImageAndTitle(name: string) {
  return (
    <div className="flex flex-col w-full items-center lg:items-start lg:w-1/3 lg:pt-12 lg:mr-12">
      <img
        src={TarotDB.image(name)}
        alt={name}
        className="max-w-[233px] my-4 lg:py-0 shadow-lg object-contain"
      />
      <h1 className="text-white text-4xl font-light pt-2">
        {TarotDB.query(name).name}
      </h1>
      <p className="text-zinc-400 font-light italic">
        {name}
      </p>
    </div>
  );
}

function TarotDescTextOneSide(
  name: string,
  side: "upright" | "reversed"
) {
  const desc = TarotDB.query(name)[side];

  return (
    <>
      <h3 className="text-zinc-400 text-3xl font-extrabold py-3 text-right">
        {side === "upright" ? "正位" : "逆位"}解读
      </h3>
      {WordCloud(desc.keywords)}

      <div className="description">
        <Markdown>{desc.full}</Markdown>
      </div>
    </>
  );
}

function TarotDescriptionText(name: string) {
  return (
    <div className="flex flex-col w-full max-w-lg lg:w-2/3 py-4 pb-4 border-b-2 border-solid border-zinc-600">
      {["upright", "reversed"].map((side) =>
        TarotDescTextOneSide(
          name,
          side as "upright" | "reversed"
        )
      )}
    </div>
  );
}

export function TarotDescription({
  name,
}: {
  name: string;
}): React.ReactElement {
  return (
    <div
      className="flex flex-col lg:flex-row p-8 w-full lg:max-w-3xl items-center lg:items-start"
      key={name}
    >
      {TarotImageAndTitle(name)}
      {TarotDescriptionText(name)}
    </div>
  );
}
