const PdfCard = ({ pdf, onClick }) => {
  const formatFileSize = (bytes) => {
    if (!bytes) return "N/A";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      onClick={onClick}
      style={{
        background: "white",
        borderRadius: "10px",
        border: "1px solid #e0e0e0",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.2s",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.08)";
      }}
    >
      {/* Icono superior */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a73e8, #1557b0)",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "40px" }}>📄</span>
      </div>

      {/* Contenido */}
      <div
        style={{
          padding: "15px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "15px",
            color: "#1a1a2e",
            lineHeight: "1.3",
          }}
        >
          {pdf.title || pdf.originalFileName}
        </h3>

        {pdf.author && (
          <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
            ✍️ {pdf.author}
          </p>
        )}

        {pdf.category && (
          <span
            style={{
              display: "inline-block",
              background: "#e8f0fe",
              color: "#1a73e8",
              padding: "3px 10px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: "600",
              width: "fit-content",
            }}
          >
            📂 {pdf.category}
          </span>
        )}

        {/* Info inferior */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "10px",
            borderTop: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            color: "#999",
          }}
        >
          <span>{formatFileSize(pdf.fileSize)}</span>
          <span>{formatDate(pdf.uploadDate)}</span>
        </div>
      </div>
    </div>
  );
};

export default PdfCard;
