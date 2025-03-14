import { createSlice } from "@reduxjs/toolkit";

export const answerStateSlice = createSlice({
  name: "answerState",
  initialState: {
    answer: "",
    done: false,
  },
  reducers: {
    clearAnswer: (state) => {
      state.answer = "";
      done: false;
    },
    appendAnswer: (state, action) => {
      state.answer += action.payload;
    },
    setDone: (state) => {
      state.done = true;
    },
  },
});

export const { clearAnswer, appendAnswer, setDone } =
  answerStateSlice.actions;
export default answerStateSlice.reducer;
