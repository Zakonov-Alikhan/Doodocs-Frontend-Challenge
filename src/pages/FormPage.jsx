import Document from "../components/document/Document";
import DocumentForm from "../components/docForm/DocumentForm";
import DocumentPageTitle from "../components/docTitle/DocumentPageTitle";
import { useState } from "react";

export default function FormPage() {
  const [formData, setFormData] = useState([]);
  return (
    <>
      <div className="docContainer">
        <DocumentPageTitle />
        <Document formData={formData} />
      </div>
      <DocumentForm setFormData={setFormData} />
    </>
  );
}
