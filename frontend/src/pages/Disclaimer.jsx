import React from "react";

const Disclaimer = () => {
  const styles = {
    container: {
      maxWidth: "1000px",
      margin: "50px auto",
      padding: "20px",
      color: "#fff",
    },
    heading: {
      color: "#ff7a00",
      marginBottom: "20px",
      textAlign: "center",
    },
    text: {
      marginBottom: "15px",
      lineHeight: "1.8",
      color: "#d1d5db",
      fontSize: "16px",
    },
    card: {
      background: "#1a1a1a",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Disclaimer</h1>

        <p style={styles.text}>
          The information provided on Trendora is for general informational and
          shopping purposes only.
        </p>

        <p style={styles.text}>
          While we strive to keep product descriptions, prices, and images
          accurate, we do not guarantee that all information is always complete,
          reliable, or error-free.
        </p>

        <p style={styles.text}>
          Product colors and appearances may vary slightly due to screen
          settings, lighting conditions, and photography.
        </p>

        <p style={styles.text}>
          Trendora shall not be held liable for any direct or indirect damages
          resulting from the use of this website or reliance on the information
          provided.
        </p>

        <p style={styles.text}>
          By using this website, you agree to these terms and acknowledge that
          all purchases are made at your own discretion.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
