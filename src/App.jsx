import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import UploaderPage from "./pages/UploaderPage";
import FormPage from "./pages/FormPage";
import { useState } from "react";

function App() {
  const [JSONContainer, setJSONContainer] = useState("");

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <UploaderPage
                JSONContainer={JSONContainer}
                setJSONContainer={setJSONContainer}
              />
            }
          />
          <Route
            path="form"
            element={<FormPage JSONContainer={JSONContainer} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
