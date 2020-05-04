import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import reducer from 'reducers';

function configureStore() {
  const store = createStore(
    reducer,
    process.env.NODE_ENV === 'production' ? undefined : devToolsEnhancer({})
  );
  return store;
}

export default configureStore;
