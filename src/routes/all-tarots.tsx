import { useSelector } from "react-redux";
import { TarotDescription } from "../components/tarotDescription";
import type { RootState } from "../states/store";
import { TarotDB } from "../utils/tarotDatabase";

export default function AllTarotsView() {
  const downloadState = useSelector(
    (state: RootState) => state.downloadState
  );

  return (
    <div className="w-full flex flex-col items-center">
      {downloadState !== "done" && (
        <div className="text-white text-2xl w-full h-full text-center py-24">
          等待下载所有图片... (还有
          {TarotDB.cards().length -
            Object.keys(TarotDB.tarotImages).length}
          张 )
        </div>
      )}
      {downloadState === "done" &&
        TarotDB.cards().map((card) =>
          TarotDescription({ name: card })
        )}
    </div>
  );
}
