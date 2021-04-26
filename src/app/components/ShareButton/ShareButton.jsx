import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isMobilePhone } from '@utils/utils';
import { ShareIconButton } from '@components/Icons/Icons';
import { ShareDialog } from '../index';

const ShareButton = ({ domain, sessionId }) => {
  const [open, setOpen] = useState(false);
  const shareData = {
    title: 'Escoge tu!',
    text: 'No se que comer 🤔 haz click en el link y busquemos juntos!',
    url: `${domain}?session=${sessionId}`,
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

export { ShareButton };

ShareButton.defaultProps = {
  domain: 'https://escogetu.com/',
};

ShareButton.propTypes = {
  sessionId: PropTypes.string.isRequired,
  domain: PropTypes.string,
};
