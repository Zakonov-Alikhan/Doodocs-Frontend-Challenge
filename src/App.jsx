import "./App.css";
import Uploader from "./components/uploader/Uploader";
import Button from "./components/UI/button/Button";
import { useState } from "react";

function App() {
  const [isDisabled, setIsDisabled] = useState(true);
  console.log(isDisabled);

  return (
    <div className="App">
      <div className="uploadPage">
        <Uploader />
        <textarea name="Json staff" disabled></textarea>
        <Button isDisabled={isDisabled}>Далее</Button>
      </div>
    </div>
  );
}

export default App;
