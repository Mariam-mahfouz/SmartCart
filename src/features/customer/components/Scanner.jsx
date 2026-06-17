import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef } from "react";

const Scanner = ({ onScanSuccess }) => {
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    const startScanner = async () => {
      html5QrCodeRef.current = new Html5Qrcode("reader");

      await html5QrCodeRef.current.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 350 },
        },
        (decodedText) => {
          onScanSuccess(decodedText);
          stopScanner();
        },
        () => {}
      );
    };

    startScanner();

    return () => stopScanner();
  }, []);

  const stopScanner = async () => {
    if (html5QrCodeRef.current?.isScanning) {
      await html5QrCodeRef.current.stop();
      await html5QrCodeRef.current.clear();
    }
  };

  return (
    <div className="relative w-full max-w-sm aspect-[9/16] rounded-3xl overflow-hidden bg-black">
      
      {/* Camera */}
      <div id="reader" ref={scannerRef} className="w-full h-full" />

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80%] h-[70%] relative">
          <span className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-white rounded-tl-xl" />
          <span className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-white rounded-tr-xl" />
          <span className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-white rounded-bl-xl" />
          <span className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-white rounded-br-xl" />
        </div>
      </div>
    </div>
  );
};

export default Scanner;
