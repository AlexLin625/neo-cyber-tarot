import { BrowserRouter, Route, Routes } from "react-router";
import { useEffect } from "react";
import { initApp } from "./utils/initApp";
import { NavBar } from "./components/navBar";
import HomeView from "./routes/home";
import AllTarotsView from "./routes/all-tarots";
import AboutView from "./routes/about";

export function App() {
  useEffect(() => {
    setTimeout(() => initApp.init(), 20);
  }, []);

  return (
    <BrowserRouter>
      <NavBar />

      <div className="h-full w-full pt-18">
        <Routes>
          <Route path="/" Component={HomeView} />
          <Route
            path="/all-tarots"
            Component={AllTarotsView}
          />
          <Route path="/about" Component={AboutView} />
        </Routes>
      </div>

      <div id="modal-root" />
    </BrowserRouter>
  );
}

export default App;
