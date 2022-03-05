import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { env } from '@constants/constants';

import { App } from '@app/App';

import './scss/main.scss';

const { SENTRY_DSN } = env;

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(<App />, document.getElementById('root'));
