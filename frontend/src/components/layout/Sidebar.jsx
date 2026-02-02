import { useState } from "react";
import CategoryFilter from "../pdf/CategoryFilter";

const Sidebar = ({
  categories,
  selectedCategory,
  onCategorySelect,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
    onCategorySelect("Todas");
  };

  return (
    <aside
      style={{
        width: "280px",
        minWidth: "280px",
        height: "100%",
        background: "#f8f9fa",
        borderRight: "1px solid #e0e0e0",
        padding: "20px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {/* Barra de búsqueda */}
      <div>
        <label
          style={{
            fontSize: "14px",
            color: "#555",
            fontWeight: "600",
            display: "block",
            marginBottom: "8px",
          }}
        >
          🔍 Buscar documentos
        </label>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Buscar por título..."
            style={{
              width: "100%",
              padding: "10px 35px 10px 12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#1a73e8")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
          {searchTerm && (
            <button
              onClick={handleClear}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                color: "#999",
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filtro de categorías */}
      <div>
        <label
          style={{
            fontSize: "14px",
            color: "#555",
            fontWeight: "600",
            display: "block",
            marginBottom: "8px",
          }}
        >
          📂 Categorías
        </label>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={onCategorySelect}
        />
      </div>

      {/* Info inferior */}
      <div
        style={{
          marginTop: "auto",
          padding: "15px",
          background: "#e8f0fe",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: "#1a73e8",
            fontWeight: "600",
          }}
        >
          📄 Documentos disponibles
        </p>
        <p
          style={{
            margin: "5px 0 0 0",
            fontSize: "22px",
            color: "#1a1a2e",
            fontWeight: "700",
          }}
        >
          {categories.length > 0 ? categories.length - 1 : 0} categorías
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
