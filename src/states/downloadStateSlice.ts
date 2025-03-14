import { createSlice } from "@reduxjs/toolkit";

export type DownloadStateType =
  | "init"
  | "preloaded"
  | "done";
export const downloadStateSlice = createSlice({
  name: "downloadState",
  initialState: "init" as DownloadStateType,
  reducers: {
    finishDownload: (): DownloadStateType => "done",
    finishPreload: (): DownloadStateType => "preloaded",
  },
});

export const { finishDownload, finishPreload } =
  downloadStateSlice.actions;
export default downloadStateSlice.reducer;
