import Uploader from "../components/uploader/Uploader";
import Button from "../components/UI/button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploaderPage({ JSONContainer, setJSONContainer }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  const goToDocumentForm = () => {
    navigate("form");
  };

  return (
    <div className="uploadPage">
      <Uploader
        setJSONContainer={setJSONContainer}
        setIsDisabled={setIsDisabled}
      />
      <textarea value={JSONContainer} className="JSONContainer" disabled>
        {JSONContainer}
      </textarea>
      <Button
        isDisabled={isDisabled}
        onClick={isDisabled ? null : goToDocumentForm}
      >
        Далее
      </Button>
    </div>
  );
}
