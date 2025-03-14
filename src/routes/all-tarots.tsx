import { useSelector } from "react-redux";
import { TarotDescription } from "../components/tarotDescription";
import type { RootState } from "../states/store";
import { TarotDB } from "../utils/tarotDatabase";
import { useEffect, useState } from "react";

export default function AllTarotsView() {
  const downloadState = useSelector(
    (state: RootState) => state.downloadState
  );

  const getRemainCount = () => {
    return (
      TarotDB.cards().length -
      Object.keys(TarotDB.tarotImages).length
    );
  };
  const [remainCount, setRemainCount] = useState(
    getRemainCount()
  );

  useEffect(() => {
    if (downloadState !== "done") {
      const timer = setTimeout(() => {
        setRemainCount(getRemainCount());
      }, 500);
      return () => clearTimeout(timer);
    }
  });

  return (
    <div className="w-full flex flex-col items-center">
      {downloadState !== "done" && (
        <div className="text-white text-2xl w-full h-full text-center py-24">
          等待下载所有图片... (还有
          {remainCount}张)
        </div>
      )}
      {downloadState === "done" &&
        TarotDB.cards().map((card) =>
          TarotDescription({ name: card })
        )}
    </div>
  );
}
