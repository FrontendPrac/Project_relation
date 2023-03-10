import { configureStore } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import postModule from '../modules/postModule';
import commentModule from '../modules/commentModule';

const persistConfig = {
  key: 'root',
  storage,
};

const postPersistedReducer = persistReducer(persistConfig, postModule);

const store = configureStore({
  reducer: {
    postModule: postPersistedReducer,
    commentModule,
  },
  middleware: [thunk],
});

export default store;
