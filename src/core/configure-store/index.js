import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducer from 'reducers';

const persistedReducer = persistReducer(
  {
    key: 'futoshiki',
    storage
  },
  reducer
);
const enhancer =
  process.env.NODE_ENV === 'production' ? undefined : devToolsEnhancer({});

function configureStore() {
  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store);
  return { persistor, store };
}

export default configureStore;
