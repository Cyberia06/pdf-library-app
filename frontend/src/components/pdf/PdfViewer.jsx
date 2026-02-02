{
  /* Header del viewer */
}
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
</div>;
