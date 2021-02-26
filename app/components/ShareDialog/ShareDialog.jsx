import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Snackbar from "@material-ui/core/Snackbar";
import styles from "./ShareDialog.module.scss";
const ShareDialog = ({ onClose, open, url }) => {
  const [openAlert, setOpenAlert] = useState(false);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const copyToClipboard = () => {
    setOpenAlert(true);
    navigator.clipboard.writeText(url);
  };

  const text = encodeURIComponent(
    `No se que comer 🤔 entra a ${url} y busquemos juntos!`
  );

  return (
    <>
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
        <span className={styles.Toast}>Copiado!</span>
      </Snackbar>
      <Dialog onClose={onClose} aria-labelledby="share-dialog" open={open}>
        <div className={styles.ShareDialog}>
          <input type="text" value={url} readOnly />
          <button onClick={copyToClipboard}>Copy to clipboard</button>
          <button
            onClick={() => (location.href = `whatsapp://send/?text=${text}`)}
          >
            whatsapp
          </button>
          <button
            onClick={() =>
              (location.href = `https://telegram.me/share/url?text=${text}`)
            }
          >
            Telegram
          </button>
          <button onClick={() => onClose(false)}>close</button>
        </div>
      </Dialog>
    </>
  );
};

export default ShareDialog;
