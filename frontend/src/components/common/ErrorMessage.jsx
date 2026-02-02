const ErrorMessage = ({ message = "Ha ocurrido un error" }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        padding: "40px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fdecea",
          border: "1px solid #f5c6cb",
          borderRadius: "10px",
          padding: "25px 35px",
          maxWidth: "500px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "24px", margin: "0 0 10px 0" }}>⚠️</p>
        <p style={{ color: "#721c24", margin: 0, fontSize: "16px" }}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default ErrorMessage;
