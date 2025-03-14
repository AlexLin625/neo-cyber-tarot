import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export interface TarotState {
  name: string;
  orientation: "upright" | "reversed";
}

export interface SpreadState {
  selectedTarots: TarotState[];
  flipped: boolean[];
  flippedCount: number;
}

const initState: SpreadState = {
  selectedTarots: [],
  flipped: Array<boolean>(3).fill(false),
  flippedCount: 0,
};

const spreadState = createSlice({
  name: "spread",
  initialState: initState,
  reducers: {
    setSpreadState(
      state,
      action: PayloadAction<SpreadState>
    ) {
      const payload = action.payload;
      state.selectedTarots = payload.selectedTarots;
    },
    flipCard(state, action: PayloadAction<number>) {
      state.flipped[action.payload] = true;
      state.flippedCount++;
    },
  },
});

export const { setSpreadState, flipCard } =
  spreadState.actions;
export default spreadState.reducer;
