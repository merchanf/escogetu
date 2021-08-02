import React, { useState } from 'react';
import ShareDialog from './ShareDialog';

export default {
  component: ShareDialog,
  title: 'Share dialog',
};

export const Default = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ShareDialog onClose={() => setOpen(false)} url="google.com" open={open} />
      <button type="button" onClick={() => setOpen(true)}>
        open
      </button>
    </>
  );
};
