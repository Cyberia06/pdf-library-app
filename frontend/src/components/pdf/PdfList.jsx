import PdfCard from "./PdfCard";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";

const PdfList = ({ pdfs, loading, error, onPdfClick }) => {
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  if (pdfs.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "#666",
          }}
        >
          <p style={{ fontSize: "50px", margin: "0 0 15px 0" }}>📭</p>
          <p style={{ fontSize: "18px", margin: "0 0 8px 0", color: "#333" }}>
            No se encontraron documentos
          </p>
          <p style={{ fontSize: "14px", margin: 0 }}>
            Intentá con otra búsqueda o categoría
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        overflowY: "auto",
        flex: 1,
      }}
    >
      <p style={{ margin: "0 0 15px 0", fontSize: "14px", color: "#666" }}>
        {pdfs.length} documento{pdfs.length !== 1 ? "s" : ""} encontrado
        {pdfs.length !== 1 ? "s" : ""}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
          alignContent: "start",
        }}
      >
        {pdfs.map((pdf) => (
          <PdfCard key={pdf.id} pdf={pdf} onClick={() => onPdfClick(pdf)} />
        ))}
      </div>
    </div>
  );
};

export default PdfList;
