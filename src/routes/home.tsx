import type { ReactElement } from "react";
import Markdown from "react-markdown";
import { useSelector, useDispatch } from "react-redux";
import { FlipCard } from "../components/flipCard";
import { TarotDescription } from "../components/tarotDescription";
import type { RootState } from "../states/store";
import {
  setFinishedAnswer,
  setFinishedFlip,
  updateQuestion,
} from "../states/userStateSlice";

import { llmWrapper } from "../utils/llmWrapperFrontend";

const recommendedQuestions = [
  "我目前的职业道路是否适合我?",
  "我最近的恋爱运怎么样?",
  "目前的选择会如何影响我的未来?",
];

export default function HomeView(): React.ReactElement {
  // Define stores
  const userState = useSelector(
    (state: RootState) => state.userState
  );
  const spreadState = useSelector(
    (state: RootState) => state.spreadState
  );
  const answerState = useSelector(
    (state: RootState) => state.answerState
  );
  const dispatch = useDispatch();

  // Define components
  const renderRecommendedQuestions = () => {
    return (
      <div className="flex flex-row flex-wrap max-w-xl py-3">
        {recommendedQuestions.map((question, index) => (
          <button
            key={index}
            className="recommend-bubble mr-3"
            onClick={() => {
              dispatch(updateQuestion(question));
            }}
          >
            {question}
          </button>
        ))}
      </div>
    );
  };

  const renderQuestionInput = () => {
    return (
      <div className="w-full h-full pt-48 px-8 flex flex-col items-center">
        <div className="input-container pt-8 pb-24 max-w-xl">
          <p className="text-4xl font-bold px-0 w-full">
            旅者
          </p>
          <p className="text-3xl font-thin pt-2 pb-8 px-0 w-full">
            想要了解什么?
          </p>
          <div className="flex flex-row items-center justify-center input-container w-full">
            <input
              type="text"
              value={userState.question}
              placeholder="向塔罗牌提问"
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                dispatch(updateQuestion(target.value));
              }}
            />
            <button
              className="py-2 px-4 ml-4 rounded-full text-zinc-200 cursor-pointer bg-zinc-900 my-3 text-nowrap"
              onClick={() => dispatch(setFinishedAnswer())}
            >
              大师我悟了!
            </button>
          </div>
          {renderRecommendedQuestions()}
        </div>
      </div>
    );
  };

  const renderFlipCards = () => {
    return (
      <div className="flex flex-col items-center w-full lg:flex-row lg:justify-center pt-8">
        {[0, 1, 2].map((index) => (
          <FlipCard key={index} index={index} />
        ))}
      </div>
    );
  };

  const renderSpread = () => {
    return (
      <div className="flex flex-col items-center w-full">
        {renderFlipCards()}
        {spreadState.flippedCount === 3 && (
          <button
            className="mt-8 py-2 px-6 ml-4 rounded-full text-zinc-200 cursor-pointer bg-zinc-900 my-3 text-nowrap"
            onClick={() => {
              dispatch(setFinishedFlip());
              handleAnsGen();
            }}
          >
            启动解读
          </button>
        )}
      </div>
    );
  };

  const handleAnsGen = () => {
    const question = userState.question;
    llmWrapper.query(spreadState, question);
  };

  const renderSpreadWithResult = () => {
    return (
      <div className="flex flex-col items-center w-full">
        {renderFlipCards()}

        <div className="w-full max-w-2xl px-6">
          <h3 className="text-3xl font-bold pt-8 pb-4 text-zinc-300">
            占卜结果
          </h3>
          <div className="description">
            <Markdown>
              {answerState.answer || "正在生成结果..."}
            </Markdown>
          </div>
        </div>

        {answerState.done && (
          <>
            <h3 className="text-3xl font-bold pt-8 pb-4 text-zinc-300 self-center text-center lg:w-xl">
              关于抽到的塔罗牌
            </h3>
            {spreadState.selectedTarots.map((card) =>
              TarotDescription({ name: card.name })
            )}
          </>
        )}
      </div>
    );
  };

  // Control flows
  let content: ReactElement;
  switch (userState.stage) {
    case "question-page":
      content = renderQuestionInput();
      break;
    case "spread-page":
      content = renderSpread();
      break;
    case "answer-show":
      content = renderSpreadWithResult();
      break;
  }

  return <div>{content}</div>;
}
