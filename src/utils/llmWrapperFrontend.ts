import {
  clearAnswer,
  appendAnswer,
  setDone,
} from "../states/answerStateSlice";
import type { SpreadState } from "../states/spreadStateSlice";
import { dispatch } from "../states/store";

interface requestBody {
  spreadState: SpreadState;
  question: string;
}

export interface llmStreamResponse {
  delta: string;
  finish_reason: string | null;
}

export class llmWrapper {
  static baseURL = "/api/qwen-forward-v2";

  static async query(
    spread: SpreadState,
    question: string
  ) {
    dispatch(clearAnswer());

    const response = await fetch(llmWrapper.baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spreadState: spread,
        question,
      } as requestBody),
    }); // Streamed response.

    const reader = response.body?.getReader();
    if (!reader) {
      dispatch(appendAnswer("LLM API 出现异常."));
      dispatch(setDone());
      return;
    }

    const decoder = new TextDecoder();

    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        dispatch(setDone());
        break;
      }

      const decoded = decoder.decode(value);
      buffer += decoded;

      let lines = buffer.split("\n\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const response = JSON.parse(
          line
        ) as llmStreamResponse;
        dispatch(appendAnswer(response.delta || ""));

        if (response.finish_reason) {
          dispatch(setDone());
          break;
        }
      }
    }
  }
}
