import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import { useEffect } from "react";
import { initApp } from "./utils/initApp";
import { NavBar } from "./components/navBar";
import HomeView from "./routes/home";
import AllTarotsView from "./routes/all-tarots";
import { RootState } from "./states/store";
import AboutView from "./routes/about";

export function App() {
  const downloadState = useSelector(
    (state: RootState) => state.downloadState
  );

  useEffect(() => {
    initApp.init();
  }, []);

  return (
    <BrowserRouter>
      <NavBar />

      <div className="h-full w-full pt-18">
        {downloadState !== "init" && (
          <Routes>
            <Route path="/" Component={HomeView} />
            <Route
              path="/all-tarots"
              Component={AllTarotsView}
            />
            <Route path="/about" Component={AboutView} />
          </Routes>
        )}
        {downloadState === "init" && (
          <div className="text-white text-2xl w-full h-full text-center py-24">
            下载图片...
          </div>
        )}
      </div>

      <div id="modal-root" />
    </BrowserRouter>
  );
}

export default App;
