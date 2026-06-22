import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        background: "#111",
        color: "#fff",
        padding: "30px 20px",
        marginTop: "50px",
        borderTop: "1px solid #222",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "30px",
        }}
      >
        {/* Brand */}
        <div>
          <h2
            style={{
              color: "#ff7a00",
              marginBottom: "10px",
              fontSize: "1.8rem",
            }}
          >
            Trendora
          </h2>

          <p style={{ color: "#ccc" }}>Your favorite place to shop online.</p>
        </div>

        {/* Explore */}
        <div>
          <h4 style={{ marginBottom: "12px" }}>Explore</h4>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
            }}
          >
            <li style={{ marginBottom: "8px" }}>
              <Link
                to="/disclaimer"
                style={{
                  color: "#ccc",
                  textDecoration: "none",
                }}
              >
                disclaimer
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 style={{ marginBottom: "12px" }}>Legal</h4>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
            }}
          >
            <li style={{ marginBottom: "8px" }}>
              <Link
                to="/return-policy"
                style={{
                  color: "#ccc",
                  textDecoration: "none",
                }}
              >
                ReturnPolicy
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                style={{
                  color: "#ccc",
                  textDecoration: "none",
                }}
              >
                about us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div
        style={{
          textAlign: "center",
          marginTop: "25px",
          paddingTop: "15px",
          borderTop: "1px solid #222",
          color: "#888",
          fontSize: "0.9rem",
        }}
      >
        © 2026 Trendora. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
