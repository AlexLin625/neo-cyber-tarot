import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export type UserStageType =
  | "question-page"
  | "spread-page"
  | "answer-show";

export interface UserStateType {
  stage: UserStageType;
  question: string;
}

const slice = createSlice({
  name: "UserState",
  initialState: {
    stage: "question-page",
    question: "",
  } as UserStateType,
  reducers: {
    setFinishedAnswer: (state) => {
      state.stage = "spread-page";
    },
    setFinishedFlip: (state) => {
      state.stage = "answer-show";
    },
    updateQuestion: (
      state,
      payload: PayloadAction<string>
    ) => {
      state.question = payload.payload;
    },
  },
});

export const {
  setFinishedAnswer,
  setFinishedFlip,
  updateQuestion,
} = slice.actions;
export default slice.reducer;
