import React, { useState, useRef, Fragment } from "react";
import {
  Container,
  Card,
  CardContent,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import QRCode from "qrcode";
import QrReader from "react-qr-reader";

function QrCodeScanner() {
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const classes = useStyles();
  const qrRef = useRef(null);

  const handleErrorFile = (error) => {
    console.log(error);
  };
  const handleScanFile = (result) => {
    if (result) {
      return setScanResultFile(result);
    }
  };
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };
  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };
  return (
    <div style={{ padding: "50px" }}>
      <div style={{ height: "50%" }}>
        <h2 className={classes.title}>
          Scan QR Code by Uploading the Image or by Scanning through Web Camera
        </h2>
        <div
          style={{
            width: "45%",
            height: "10%",
            marginLeft: "450px",
          }}
        >
          <Button
            className={classes.btn}
            variant="contained"
            color="secondary"
            onClick={onScanFile}
          >
            Click Here to Upload QR Code
          </Button>
          <div style={{ width: "500px" }}>
            <QrReader
              ref={qrRef}
              delay={300}
              onError={handleErrorFile}
              onScan={handleScanFile}
              legacyMode
            />
          </div>

          <h3>
            Scanned Code: <href>{scanResultFile}</href>{" "}
          </h3>
        </div>
        <h2 className={classes.title}>Scan QR Code through Web Camera</h2>
        <div
          style={{
            width: "45%",
            height: "40%",
            marginLeft: "450px",
          }}
        >
          <div style={{ width: "500px" }}>
            <QrReader
              delay={300}
              onError={handleErrorWebCam}
              onScan={handleScanWebCam}
            />
          </div>
          <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  conatiner: {
    height: "100%",
    marginTop: 10,
    backgroundColor: "#e9e2ec",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#88b5b4",
    color: "#fff",
    padding: 20,
  },
  btn: {
    backgroundColor: "#ed695a",
    marginLeft: "120px",
    marginTop: 10,
    marginBottom: 20,
  },
}));
export default QrCodeScanner;
