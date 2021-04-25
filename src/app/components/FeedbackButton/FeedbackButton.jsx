import React from 'react';
import Feedback from 'feeder-react-feedback';
import 'feeder-react-feedback/dist/feeder-react-feedback.css';
import './FeedbackButton.css';
import PropTypes from 'prop-types';

export const FeedbackButton = ({ projectId }) => {
  return (
    <Feedback
      projectId={projectId}
      email
      emailRequired
      feedbackTypes={['Comentario', 'Idea']}
      submitButtonMsg="Enviar Comentario"
      postSubmitButtonMsg="Gracias!"
    />
  );
};

FeedbackButton.propTypes = {
  projectId: PropTypes.string.isRequired,
};
