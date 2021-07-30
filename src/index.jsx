import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import { App } from '@app/App';

import './scss/main.scss';

Sentry.init({
  dsn: 'https://8c67575151b64c38802a2a4df61f8fda@o935667.ingest.sentry.io/5885467',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(<App />, document.getElementById('root'));
