const Header = ({ isMobile, sidebarOpen, onToggleSidebar, showToggle }) => {
  return (
    <header
      style={{
        background: "linear-gradient(135deg, #1a1a2e, #16213e)",
        color: "white",
        padding: isMobile ? "10px 15px" : "15px 30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        zIndex: 100,
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Botón hamburguesa (solo mobile) */}
        {isMobile && showToggle && (
          <button
            onClick={onToggleSidebar}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "24px",
              cursor: "pointer",
              padding: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "6px",
            }}
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>
        )}
        <span style={{ fontSize: isMobile ? "22px" : "28px" }}>📚</span>
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: isMobile ? "18px" : "22px",
              fontWeight: "700",
              letterSpacing: "0.5px",
            }}
          >
            Biblioteca PDF
          </h1>
          {!isMobile && (
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color: "#a0b4cc",
                marginTop: "2px",
              }}
            >
              Tu colección de libros
            </p>
          )}
        </div>
      </div>
      <div style={{ fontSize: "13px", color: "#a0b4cc" }}>
        Bienvenido, Quique
      </div>
    </header>
  );
};

export default Header;
