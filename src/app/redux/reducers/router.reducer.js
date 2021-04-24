import { connectRouter } from 'connected-react-router';
import { history } from '@app/history';
import { ROUTER_SECTION_NAME } from '../stores/router.store';

export const ROUTER_PARTIAL = {
  [ROUTER_SECTION_NAME]: connectRouter(history),
};
