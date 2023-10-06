import {ILiked, Song} from '../../constants';

const MusicReducer = (
  state: {loading: boolean; songs: Song[]} = {
    loading: false,
    songs: [],
  },
  action: {songs: Song[]; song: Song; id: number; type: string},
) => {
  switch (action.type) {
    case 'SHOW_LOADING': {
      return {...state, isLoading: true};
    }
    case 'HIDE_LOADING': {
      return {...state, isLoading: false};
    }
    case 'SAVE_SONGS': {
      return {...state, isLoading: false, songs: action.songs || []};
    }
    case 'SAVE_LIST_SONGS': {
      let lstSong = state.songs;
      if (action.song) {
        lstSong = [...lstSong, action.song];
      }
      return {
        ...state,
        isLoading: false,
        songs: lstSong,
      };
    }
    case 'UPDATE_LIST_SONGS': {
      let lstSong = state.songs;
      let newlstSong;
      if (action.song) {
        newlstSong = lstSong.map((item: Song) => {
          if (item.id === action.song.id) {
            return action.song;
          }
          return item;
        });
      }

      return {
        ...state,
        isLoading: false,
        songs: newlstSong,
      };
    }
    case 'DELETE_SONG': {
      let lstSong = state.songs;
      let newLstSong;
      if (action.id) {
        newLstSong = lstSong.filter(
          (item: Song) => item.id !== Number(action.id),
        );
      }
      return {
        ...state,
        isLoading: false,
        songs: newLstSong,
      };
    }
    default:
      return state;
  }
};
const LikedReducer = (
  state: {loading: boolean; likeds: ILiked[]} = {
    loading: false,
    likeds: [],
  },
  action: {likeds: ILiked[]; liked: ILiked; id: number; type: string},
) => {
  switch (action.type) {
    case 'SHOW_LIKED_LOADING': {
      return {...state, isLoading: true};
    }
    case 'HIDE_LIKED_LOADING': {
      return {...state, isLoading: false};
    }
    case 'GET_LIKED_SONGS': {
      return {...state, isLoading: false, likeds: action.likeds || []};
    }
    case 'POST_LIST_LIKED': {
      let lstLikedSong = state.likeds;
      if (action.liked) {
        lstLikedSong = [...lstLikedSong, action.liked];
      }
      return {
        ...state,
        isLoading: false,
        likeds: lstLikedSong,
      };
    }
    case 'DELETE_LIKED': {
      let lstLikedSong = state.likeds;
      let newLstLikedSong;
      if (action.id) {
        newLstLikedSong = lstLikedSong.filter(
          (item: ILiked) => item.id !== Number(action.id),
        );
      }
      return {
        ...state,
        isLoading: false,
        likeds: newLstLikedSong,
      };
    }
    default:
      return state;
  }
};

export {MusicReducer, LikedReducer};
