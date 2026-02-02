import { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import PdfList from "../components/pdf/PdfList";
import PdfViewer from "../components/pdf/PdfViewer";
import pdfApi from "../api/pdfApi";

const HomePage = () => {
  const [allPdfs, setAllPdfs] = useState([]);
  const [filteredPdfs, setFilteredPdfs] = useState([]);
  const [categories, setCategories] = useState(["Todas"]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Detectar tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cargar datos al inicio
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [pdfs, cats] = await Promise.all([
          pdfApi.getAllPdfs(),
          pdfApi.getAllCategories(),
        ]);
        setAllPdfs(pdfs);
        setFilteredPdfs(pdfs);
        setCategories(["Todas", ...cats]);
      } catch (err) {
        setError(
          "No se pudo conectar con el servidor. Verificá que el backend esté corriendo en localhost:8080",
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filtrar cuando cambia búsqueda o categoría
  useEffect(() => {
    let result = allPdfs;

    if (selectedCategory !== "Todas") {
      result = result.filter((pdf) => pdf.category === selectedCategory);
    }

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (pdf) =>
          (pdf.title && pdf.title.toLowerCase().includes(term)) ||
          (pdf.author && pdf.author.toLowerCase().includes(term)) ||
          (pdf.originalFileName &&
            pdf.originalFileName.toLowerCase().includes(term)),
      );
    }

    setFilteredPdfs(result);
  }, [allPdfs, selectedCategory, searchTerm]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (isMobile) setSidebarOpen(false);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handlePdfClick = (pdf) => {
    setSelectedPdf(pdf);
    if (isMobile) setSidebarOpen(false);
  };

  const handleClosePdfViewer = () => {
    setSelectedPdf(null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Header */}
      <Header
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        showToggle={!selectedPdf}
      />

      {/* Overlay mobile (cuando el sidebar está abierto) */}
      {isMobile && sidebarOpen && !selectedPdf && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            zIndex: 50,
          }}
        />
      )}

      {/* Contenido principal */}
      <div
        style={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Sidebar */}
        {!selectedPdf && (
          <div
            style={{
              position: isMobile ? "fixed" : "relative",
              top: isMobile ? "0" : "auto",
              left: isMobile ? (sidebarOpen ? "0" : "-300px") : "auto",
              width: isMobile ? "280px" : sidebarOpen ? "280px" : "0px",
              height: isMobile ? "100%" : "auto",
              zIndex: isMobile ? 60 : 1,
              transition: "all 0.3s ease",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <Sidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
              onSearch={handleSearch}
            />
          </div>
        )}

        {/* Zona principal */}
        <div
          style={{ flex: 1, overflow: "hidden", display: "flex", minWidth: 0 }}
        >
          {selectedPdf ? (
            <PdfViewer pdf={selectedPdf} onClose={handleClosePdfViewer} />
          ) : (
            <PdfList
              pdfs={filteredPdfs}
              loading={loading}
              error={error}
              onPdfClick={handlePdfClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
