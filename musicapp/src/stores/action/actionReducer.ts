import axios from 'axios';
import {AppDispatch} from '../';

const getListSong = () => async (dispatch: AppDispatch) => {
  dispatch({
    type: 'SHOW_LOADING',
  });
  const response = await axios.get('http://10.0.2.2:8080/music');
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
export {getListSong};
