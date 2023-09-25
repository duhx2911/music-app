const initialState = {value: 0};

function counterReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'increment': {
      return {...state, value: action.state};
    }
    case 'decrement':
      return {...state, value: action.state};
    default:
      return state;
  }
}

interface ISong {
  id: number;
  genre: string;
  title: string;
  artwork: string;
  artist: string;
  url: string;
}
const MusicReducer = (
  state: {loading: boolean; songs: ISong[]} = {
    loading: false,
    songs: [],
  },
  action: {songs: ISong[]; song: ISong; id: number; type: string},
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
        newlstSong = lstSong.map((item: ISong) => {
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
          (item: ISong) => item.id !== Number(action.id),
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
export {counterReducer, MusicReducer};
