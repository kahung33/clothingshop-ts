import { compose, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

//root-reducer

const middileWares = [logger];

const composedEnhancer = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancer);