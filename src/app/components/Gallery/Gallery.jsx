import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import PhotoGallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';

const Gallery = ({ pictures }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [customPictures, setCustomPictures] = useState([]);

  useEffect(() => {
    if (pictures.length > 0) {
      const newPictures = pictures.slice(0, 6).map((picture) => ({
        src: picture,
        width: 1,
        height: 1,
      }));
      setCustomPictures(newPictures);
    }
  }, [pictures]);

  const openLightbox = useCallback((_, { index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    customPictures &&
    customPictures.length > 0 && (
      <>
        <PhotoGallery
          photos={customPictures}
          direction="column"
          columns={3}
          onClick={openLightbox}
        />
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={customPictures.map((x) => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title,
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </>
    )
  );
};

export default Gallery;

Gallery.defaultProps = {
  pictures: [],
};

Gallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.string),
};
