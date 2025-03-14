import { dispatch } from "../states/store";
import { setSpreadState } from "../states/spreadStateSlice";
import {
  finishDownload,
  finishPreload,
} from "../states/downloadStateSlice";
import { TarotDB } from "./tarotDatabase";
import type {
  SpreadState,
  TarotState,
} from "../states/spreadStateSlice";

export class initApp {
  static isCalled = false;

  static getShuffleTarot() {
    const selectedTarots: TarotState[] = [];
    const cards = TarotDB.cards();
    const shuffled = cards.sort(() => Math.random() - 0.5);

    shuffled.slice(0, 3).forEach((name) => {
      const epsilon = Math.random();
      let orientation: "upright" | "reversed";
      if (epsilon < 0.3) orientation = "reversed";
      else orientation = "upright";
      selectedTarots.push({
        name,
        orientation,
      });
    });
    return selectedTarots;
  }

  static async init() {
    if (initApp.isCalled) return;
    initApp.isCalled = true;

    await TarotDB.downloadDB();

    // Select 3 random cards.
    const selectedTarots: TarotState[] =
      initApp.getShuffleTarot();

    dispatch(
      setSpreadState({
        selectedTarots: selectedTarots,
      } as SpreadState)
    );
    // Fetch these cards.
    await Promise.all(
      selectedTarots.map((tarot) => {
        TarotDB.downloadImage(tarot.name);
      })
    );

    dispatch(finishPreload());

    setTimeout(async () => {
      TarotDB.downloadImages().then(() => {
        dispatch(finishDownload());
      });
    });
  }
}
