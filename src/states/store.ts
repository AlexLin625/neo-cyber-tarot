import { configureStore } from "@reduxjs/toolkit";

// Reducers
import downloadStateSlice from "./downloadStateSlice";
import spreadStateSlice from "./spreadStateSlice";
import answerStateSlice from "./answerStateSlice";
import userStateSlice from "./userStateSlice";

export const store = configureStore({
  reducer: {
    downloadState: downloadStateSlice,
    spreadState: spreadStateSlice,
    answerState: answerStateSlice,
    userState: userStateSlice,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const dispatch = store.dispatch;
