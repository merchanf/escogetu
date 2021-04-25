import React from 'react';
import Feedback from 'feeder-react-feedback';
import 'feeder-react-feedback/dist/feeder-react-feedback.css';
import './FeedbackButton.css';

export const FeedbackButton = ({ projectId }) => {
  return (
      <div
        placeholder="PLACEHOLDER GONORREA"
      >
    <Feedback
      projectId={projectId}
      email
      emailRequired
      feedbackTypes={["Comentario","Idea"]}
      submitButtonMsg="Enviar Comentario"
      postSubmitButtonMsg="Gracias!"
    />
    </div>
  );
};
