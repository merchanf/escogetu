import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Snackbar from "@material-ui/core/Snackbar";
import styles from "./ShareDialog.module.scss";
import {
  LinkIcon,
  CopyIcon,
  WhatsappIcon,
  TelegramIcon,
  CrossIcon,
} from "../Icons/Icons";

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

  const handleFocus = (event) => event.target.select();

  return (
    <>
      <Snackbar open={openAlert} autoHideDuration={1500} onClose={handleClose}>
        <span className={styles.Toast}>Copiado!</span>
      </Snackbar>
      <Dialog onClose={onClose} aria-labelledby="share-dialog" open={open}>
        <div className={styles.ShareDialog}>
          <h3>¡Comparte con tus amigos!</h3>
          <span className={styles.ShareDialog__Url}>
            <LinkIcon className={styles.ShareDialog__Url__Icon} size="small" />
            <input
              className={styles.ShareDialog__Url__Input}
              type="text"
              value={url}
              readOnly
              onFocus={handleFocus}
            />
          </span>
          <button onClick={copyToClipboard}>
            <CopyIcon
              className={styles.ShareDialog__Button__Icon}
              size="small"
            />
            Copy to clipboard
          </button>
          <button
            onClick={() => (location.href = `whatsapp://send/?text=${text}`)}
          >
            <WhatsappIcon size="small" />
            whatsapp
          </button>
          <button
            onClick={() =>
              (location.href = `https://telegram.me/share/url?text=${text}`)
            }
          >
            <TelegramIcon size="small" />
            Telegram
          </button>
          <button onClick={() => onClose(false)}>
            <CrossIcon
              className={styles.ShareDialog__Button__Icon}
              size="small"
            />
            Close
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default ShareDialog;