import axios from 'axios';
import {AppDispatch} from '../';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ENV_BE, USER_INFO} from '../../constants';

const getListSong = () => async (dispatch: AppDispatch) => {
  dispatch({
    type: 'SHOW_LOADING',
  });
  const response = await axios.get(`${ENV_BE}/music`);
  if (response.status) {
    dispatch({
      type: 'SAVE_SONGS',
      songs: response.data || [],
    });
  } else {
    dispatch({
      type: 'HIDE_LOADING',
    });
  }
};

const getListLiked = () => async (dispatch: AppDispatch) => {
  dispatch({
    type: 'SHOW_LIKED_LOADING',
  });
  const getUser = JSON.parse((await AsyncStorage.getItem(USER_INFO)) || '');
  // console.log('user', getUser.AccountID);
  const response = await axios.get(`${ENV_BE}/getliked/${getUser.AccountID}`);
  if (response.status) {
    dispatch({
      type: 'GET_LIKED_SONGS',
      likeds: response.data || [],
    });
  } else {
    dispatch({
      type: 'HIDE_LIKED_LOADING',
    });
  }
};
const postLiked =
  (body: any, callback: any) => async (dispatch: AppDispatch) => {
    dispatch({
      type: 'SHOW_LIKED_LOADING',
    });
    const response = await axios.post(`${ENV_BE}/liked`, body);
    // console.log("test", response.data);
    if (response.status === 200) {
      if (response.data.status === 'success') {
        if (response.data) {
          dispatch({
            type: 'POST_LIST_LIKED',
            liked: response.data.data || [],
          });
          // console.log(response.data.data);
        }

        // console.log("test", response.data);
      }
    }
    if (callback) {
      callback(response.data.status);
    }
    dispatch({
      type: 'HIDE_LIKED_LOADING',
    });
  };

const delLikeSong =
  (id: number, callback: any) => async (dispatch: AppDispatch) => {
    dispatch({
      type: 'SHOW_LIKED_LOADING',
    });
    const response = await axios.delete(`${ENV_BE}/liked/${id}`);

    if (response.status) {
      if (response.data.status === 'success') {
        if (response.data) {
          dispatch({
            type: 'DELETE_LIKED',
            id: response.data.data || [],
          });
        }
      }
    }
    if (callback) {
      callback(response.data.status);
    }
    dispatch({
      type: 'HIDE_LIKED_LOADING',
    });
  };

export {getListSong, getListLiked, postLiked, delLikeSong};
