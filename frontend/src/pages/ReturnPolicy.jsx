import React from "react";

const ReturnPolicy = () => {
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
        <h1 style={styles.heading}>Return Policy</h1>

        <p style={styles.text}>
          At Trendora, customer satisfaction is our priority. If you are not
          completely satisfied with your purchase, you may request a return
          within 7 days of receiving your order.
        </p>

        <p style={styles.text}>
          Returned products must be unused, unwashed, and in their original
          packaging with all tags attached.
        </p>

        <p style={styles.text}>
          Once your return is received and inspected, we will notify you of the
          approval or rejection of your refund request.
        </p>

        <p style={styles.text}>
          Approved refunds will be processed within 5–7 business days and
          credited to the original payment method.
        </p>

        <p style={styles.text}>
          Shipping charges are non-refundable unless the item received is
          damaged, defective, or incorrect.
        </p>
      </div>
    </div>
  );
};

export default ReturnPolicy;
