import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isMobilePhone } from '@utils/utils';
import { ShareIconButton } from '@components/Icons/Icons';
import { ShareDialog } from '../index';

const ShareButton = ({ sessionId }) => {
  const [open, setOpen] = useState(false);
  const shareData = {
    title: 'Escoge tu!',
    text: 'No se que comer 🤔 haz click en el link y busquemos juntos!',
    url: `http://escogetu.com/?session=${sessionId}`,
  };

  const showModal = async () => {
    if (isMobilePhone()) {
      await navigator.share(shareData);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <ShareDialog onClose={() => setOpen(false)} url={shareData.url} open={open} />
      <ShareIconButton onClick={showModal} size="small" color="blue" />
    </>
  );
};

export { ShareButton };

ShareButton.propTypes = {
  sessionId: PropTypes.string.isRequired,
};
