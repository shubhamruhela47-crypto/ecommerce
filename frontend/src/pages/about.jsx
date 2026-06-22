import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const About = () => {
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
        <h1 style={styles.heading}>About Trendora</h1>

        <p style={styles.text}>
          Welcome to Trendora, your destination for modern fashion and timeless
          style. We are passionate about bringing high-quality clothing and
          accessories to customers who value comfort, confidence, and elegance.
        </p>

        <p style={styles.text}>
          Our mission is to make fashion accessible to everyone by offering
          carefully selected collections that combine quality, affordability,
          and the latest trends.
        </p>

        <p style={styles.text}>
          At Trendora, customer satisfaction is our top priority. We strive to
          provide a seamless shopping experience, secure payments, and reliable
          delivery services.
        </p>

        <p style={styles.text}>
          Thank you for choosing Trendora. We look forward to helping you
          express your unique style every day.
        </p>

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <h3 style={{ color: "#ff7a00", marginBottom: "15px" }}>Follow Us</h3>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              fontSize: "30px",
            }}
          >
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#1877F2" }}
            >
              <FaFacebook />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#E4405F" }}
            >
              <FaInstagram />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#1DA1F2" }}
            >
              <FaTwitter />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#0A66C2" }}
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
