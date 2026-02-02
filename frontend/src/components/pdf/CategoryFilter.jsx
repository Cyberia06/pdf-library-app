const CategoryFilter = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategorySelect(category)}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border:
              selectedCategory === category
                ? "1px solid #1a73e8"
                : "1px solid transparent",
            background: selectedCategory === category ? "#e8f0fe" : "white",
            color: selectedCategory === category ? "#1a73e8" : "#555",
            cursor: "pointer",
            fontSize: "14px",
            textAlign: "left",
            fontWeight: selectedCategory === category ? "600" : "400",
            transition: "all 0.2s",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          }}
          onMouseEnter={(e) => {
            if (selectedCategory !== category) {
              e.target.style.background = "#f0f0f0";
            }
          }}
          onMouseLeave={(e) => {
            if (selectedCategory !== category) {
              e.target.style.background = "white";
            }
          }}
        >
          {category === "Todas" ? "📂 " : "📄 "}
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
