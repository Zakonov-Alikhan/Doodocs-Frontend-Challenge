import Document from "../components/document/Document";
import DocumentForm from "../components/docForm/DocumentForm";
import DocumentPageTitle from "../components/docTitle/DocumentPageTitle";

export default function FormPage({ JSONContainer }) {
  return (
    <>
      <div className="docContainer">
        <DocumentPageTitle />
        <Document />
      </div>
      <DocumentForm JSONContainer={JSONContainer} />
    </>
  );
}
