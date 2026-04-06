import { useEffect, useRef, useState } from "react";

export default function PWAPopup() {
  const [visible, setVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    if (isStandalone) return;

    // Android
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    timeoutRef.current = setTimeout(() => {
      const hasSeen = localStorage.getItem("pwa-popup-shown");

      if (!hasSeen) {
        setVisible(true);
      }
    }, 2000);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    closePopup();
  };

  const closePopup = () => {
    localStorage.setItem("pwa-popup-shown", "true");

    setVisible(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  if (!visible) return null;

  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <h3>
          <i class="fa-solid fa-mobile-screen"></i> Cài app để dùng nhanh hơn
        </h3>

        <p>
          {isIOS ? (
            <>
              Nhấn{" "}
              <b>
                Icon Download ở bên cạnh thanh địa chỉ của Chrome hoặc Share ở
                Safari ⬆️
              </b>
              <br />→ Chọn <b>Thêm vào MH chính</b> <br />→ Nhấn <b>Thêm</b>
            </>
          ) : (
            "Website có thể cài app trên điện thoại để sử dụng thuận tiện "
          )}
        </p>

        {/* Android */}
        {!isIOS && deferredPrompt && (
          <button style={styles.installBtn} onClick={handleInstall}>
            Cài đặt ngay
          </button>
        )}

        <button style={styles.closeBtn} onClick={closePopup}>
          Để sau
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  box: {
    background: "#1e1e1e",
    color: "#fff",
    padding: "20px",
    borderRadius: "12px",
    width: "300px",
    textAlign: "center",
  },
  installBtn: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    background: "#4caf50",
    border: "none",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
  },
  closeBtn: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    background: "#555",
    border: "none",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
