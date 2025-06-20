"use client";
import { useEffect, useRef } from "react";
import { Toolbar, Inject } from "@syncfusion/ej2-react-documenteditor";
import dynamic from "next/dynamic";

export default function Documents({ docxPath }) {
  // Dynamically import DocumentEditorContainerComponent to avoid SSR issues
  const DocumentEditorContainerComponent = dynamic(
    () =>
      import("@syncfusion/ej2-react-documenteditor").then(
        (mod) => mod.DocumentEditorContainerComponent
      ),
    { ssr: false }
  );
  const documentEditorContainerRef = useRef(null);
  useEffect(() => {
    // Load Syncfusion styles
    const head = document.head;
    const link1 = document.createElement("link");
    link1.rel = "stylesheet";
    link1.href = "https://cdn.syncfusion.com/ej2/23.1.36/material.css";
    link1.id = "syncfusion-style";

    head.appendChild(link1);

    return () => {
      const existing = document.getElementById("syncfusion-style");
      if (existing) head.removeChild(existing);
    };
  }, []);

  const onSave = () => {
    const editor = documentEditorContainerRef.current;
    if (editor) {
      editor.documentEditor.save("document", "Docx");
    }
  };

  const onChange = () => {
    documentEditorContainerRef.current.documentEditorSettings.showRuler = true;
  };

  return (
    <div className="">
      <DocumentEditorContainerComponent
        height="100vh"
        enableToolbar={true}
        ref={documentEditorContainerRef}
        autoResizeOnVisibilityChange={true}
        locale="en-US"
        serviceUrl={process.env.NEXT_SYNCFUSION_SERVICE_URL}
      >
        <Inject services={[Toolbar]} />
      </DocumentEditorContainerComponent>
    </div>
  );
}
