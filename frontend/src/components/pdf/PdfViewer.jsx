import { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import pdfApi from "../../api/pdfApi";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const PdfViewer = ({ pdf, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const goToPreviousPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.3));
  };

  const resetZoom = () => {
    setScale(1.0);
  };

  const handleDownload = () => {
    const url = pdfApi.getPdfUrl(pdf.fileName);
    const link = document.createElement("a");
    link.href = url;
    link.download = pdf.originalFileName || pdf.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <style>{`
        .textLayer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }
        .textLayer span {
          position: absolute;
          color: transparent;
          font-family: sans-serif;
          white-space: pre;
          cursor: text;
          pointer-events: auto;
        }
        .textLayer span::selection {
          background: #1a73e8;
          color: white;
        }
        .page {
          position: relative;
        }
        .react-pdf__Page {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .react-pdf__Page__canvas {
          max-width: 100%;
          height: auto !important;
        }
      `}</style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          background: "#f0f2f5",
        }}
      >
        {/* Header del viewer */}
        <div
          style={{
            background: "#1a1a2e",
            color: "white",
            padding: "10px 15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            flexShrink: 0,
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {/* Título */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flex: "1 1 auto",
              minWidth: 0,
              maxWidth: "45%",
            }}
          >
            <span style={{ fontSize: "18px" }}>📄</span>
            <span
              style={{
                fontSize: "14px",
                fontWeight: "600",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {pdf.title || pdf.originalFileName}
            </span>
          </div>

          {/* Controles centrales: paginación */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={goToPreviousPage}
              disabled={pageNumber <= 1}
              style={btnNavStyle(pageNumber <= 1)}
            >
              ◀
            </button>
            <span
              style={{
                fontSize: "14px",
                color: "#ccc",
                minWidth: "70px",
                textAlign: "center",
              }}
            >
              {pageNumber} / {numPages || "?"}
            </span>
            <button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              style={btnNavStyle(pageNumber >= numPages)}
            >
              ▶
            </button>
          </div>

          {/* Controles derecha: zoom + botones */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <button onClick={zoomOut} style={btnZoomStyle}>
              −
            </button>
            <button
              onClick={resetZoom}
              style={{ ...btnZoomStyle, minWidth: "48px", fontSize: "12px" }}
            >
              {Math.round(scale * 100)}%
            </button>
            <button onClick={zoomIn} style={btnZoomStyle}>
              +
            </button>
            <button onClick={handleDownload} style={btnActionStyle("#1a73e8")}>
              ⬇
            </button>
            <button onClick={onClose} style={btnActionStyle("#e53935")}>
              ✕
            </button>
          </div>
        </div>

        {/* Contenido del PDF */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: loading ? "center" : "flex-start",
            padding: "20px",
            background: "#525252",
            minHeight: 0,
          }}
        >
          {loading && (
            <div style={{ color: "#fff", fontSize: "16px" }}>
              Cargando PDF...
            </div>
          )}
          <Document
            file={pdfApi.getPdfUrl(pdf.fileName)}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => {
              console.error("Error cargando PDF:", error);
              setLoading(false);
            }}
            loading={<div style={{ color: "#fff" }}>Cargando documento...</div>}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              width={Math.min(window.innerWidth * 0.9, 1200)}
            />
          </Document>
        </div>
      </div>
    </>
  );
};

// Estilos de botones
const btnNavStyle = (disabled) => ({
  background: disabled ? "#333" : "#16213e",
  color: disabled ? "#666" : "white",
  border: "none",
  borderRadius: "6px",
  padding: "6px 12px",
  cursor: disabled ? "not-allowed" : "pointer",
  fontSize: "14px",
  transition: "background 0.2s",
});

const btnZoomStyle = {
  background: "#16213e",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "6px 10px",
  cursor: "pointer",
  fontSize: "16px",
  minWidth: "30px",
  textAlign: "center",
};

const btnActionStyle = (bgColor) => ({
  background: bgColor,
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "6px 12px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "600",
  transition: "opacity 0.2s",
});

export default PdfViewer;
