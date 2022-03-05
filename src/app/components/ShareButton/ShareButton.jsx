import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ShareDialog from '@components/ShareDialog/ShareDialog';
import { isMobilePhone } from '@utils/utils';
import { ShareIconButton } from '@components/Icons/Icons';

const ShareButton = ({ sessionId }) => {
  const [open, setOpen] = useState(false);
  const { protocol, host } = window.location;

  const shareData = {
    title: 'Escoge tu!',
    text: 'No se que comer 🤔 haz click en el link y busquemos juntos!',
    url: `${protocol}//${host}/?session=${sessionId}`,
  };

  const openShareModal = async () => {
    if (isMobilePhone() && navigator?.share) await navigator.share(shareData);
    else setOpen(true);
  };

  return (
    <>
      <ShareDialog onClose={() => setOpen(false)} url={shareData.url} open={open} />
      <ShareIconButton onClick={openShareModal} size="small" color="blue" />
    </>
  );
};

ShareButton.propTypes = {
  sessionId: PropTypes.string.isRequired,
};

export default ShareButton;
