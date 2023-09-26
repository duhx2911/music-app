// redux saga or redux thunk
import {configureStore} from '@reduxjs/toolkit';
import {MusicReducer, LikedReducer} from './reducer/counterReducer';
import {combineReducers} from 'redux';

const store = configureStore({
  reducer: combineReducers({
    MusicReducer,
    LikedReducer,
  }),
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware().concat(logger, thunk),
  // devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
