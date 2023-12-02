import { QRCode } from "react-qr-svg";

const styles = {
  root: {
    fontFamily: "sans-serif",
  },
  h1: {
    textAlign: "center",
  },
  qrcode: {
    textAlign: "center",
  },
};

const TestsQrCode = () => {
  return (
    <div style={styles.root}>
      <h1 style={styles.h1}>QRCode with JSON</h1>
      <div style={styles.qrcode}>
        <QRCode
          level="Q"
          style={{ width: 256 }}
          value={JSON.stringify({
            id: 928328,
            name: "Jane Doe",
            insider: true,
          })}
        />
      </div>
    </div>
  );
};

export default TestsQrCode;
