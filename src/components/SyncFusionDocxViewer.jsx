"use client"

import { useEffect, useRef } from "react"
import { DocumentEditorContainerComponent, Toolbar, Inject } from "@syncfusion/ej2-react-documenteditor"

export default function SyncfusionDocxViewer({ userData }) {
  console.log("SyncfusionDocxViewer", userData)
  const documentEditorContainerRef = useRef(null)

  // Load Syncfusion styles
  useEffect(() => {
    const head = document.head
    const link1 = document.createElement("link")
    link1.rel = "stylesheet"
    link1.href = "https://cdn.syncfusion.com/ej2/23.1.36/material.css"
    link1.id = "syncfusion-style"

    head.appendChild(link1)

    return () => {
      const existing = document.getElementById("syncfusion-style")
      if (existing) head.removeChild(existing)
    }
  }, [])

  // Load the document when the component mounts and configure read-only mode
  useEffect(() => {
    if (documentEditorContainerRef.current) {
      const container = documentEditorContainerRef.current
      const editor = container.documentEditor

      // Load the document
      editor.open(userData.filePath)

      // Configure read-only mode
      editor.isReadOnly = true

      // Disable specific editing features
      container.restrictEditing = true
    }
  }, [userData.filePath])

  // Function to download the document
  const onDownload = () => {
    if (documentEditorContainerRef.current) {
      const editor = documentEditorContainerRef.current.documentEditor
      editor.save(`${userData.patientId}-${userData.fileName}`, "Docx")
    }
  }

  // Function to print the document
  const onPrint = () => {
    if (documentEditorContainerRef.current) {
      const editor = documentEditorContainerRef.current.documentEditor
      editor.print()
    }
  }

  const DocxHeader = () => {
    return (
      <div className="bg-primary text-white py-2 px-4 d-flex justify-content-between align-items-center">
        <span className="ms-2">{userData.docxName}</span>
        <div className="d-flex">
          <button
            onClick={onDownload}
            className="btn text-white d-flex align-items-center me-3"
            title="Download Document"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-download"
              viewBox="0 0 16 16"
            >
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
            </svg>
            <span className="d-none d-sm-inline ms-2">Download</span>
          </button>
          <button onClick={onPrint} className="btn text-white d-flex align-items-center" title="Print Document">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-printer"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
              <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
            </svg>
            <span className="d-none d-sm-inline ms-2">Print</span>
          </button>
        </div>
      </div>
    )
  }

  // Event handler for toolbar creation to customize it for read-only mode
  const onToolbarCreated = () => {
    if (documentEditorContainerRef.current) {
      const toolbar = documentEditorContainerRef.current.toolbar

      // Hide editing-related toolbar items
      const itemsToHide = [
        "New",
        "Open",
        "Separator",
        "Undo",
        "Redo",
        "Separator",
        "Image",
        "Table",
        "Hyperlink",
        "Bookmark",
        "TableOfContents",
        "Header",
        "Footer",
        "PageSetup",
        "PageNumber",
        "Break",
        "Find",
        "LocalClipboard",
        "RestrictEditing",
        "FormFields",
        "UpdateFields",
      ]

      itemsToHide.forEach((item) => {
        const toolbarItem = toolbar?.element?.querySelector(`[title="${item}"]`)
        if (toolbarItem) {
          toolbarItem.style.display = "none"
        }
      })
    }
  }

  return (
    <div>
      <DocxHeader />
      <DocumentEditorContainerComponent
        id={`container-${userData.docxId}`}
        height="600px"
        enableToolbar={false}
        ref={documentEditorContainerRef}
        autoResizeOnVisibilityChange={true}
        locale="en-US"
        serviceUrl={process.env.NEXT_PUBLIC_SYNCFUSION_SERVICE_URL}
        toolbarClick={onToolbarCreated}
      >
        <Inject services={[Toolbar]} />
      </DocumentEditorContainerComponent>
    </div>
  )
}
