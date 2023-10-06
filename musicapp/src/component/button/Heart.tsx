import {useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../context';
import {ToastAndroid} from 'react-native';
import store from '../../stores';
import {delLikeSong, postLiked} from '../../stores/action/actionReducer';
import useProfile from '../../hooks/useProfile';
import * as RootNavigation from '../../routes/RootNavigation';
import {ILiked} from '../../constants';
const HeartComponent = ({song}: any) => {
  const {dataLiked, isLogin} = useContext(AuthContext);
  const profile = useProfile(isLogin);
  //   console.log(song);

  const showLiked = (status: string) => {
    if (status === 'success') {
      ToastAndroid.show('Đã thích bài hát', ToastAndroid.SHORT);
    }
  };
  const showDisliked = (status: string) => {
    if (status === 'success') {
      ToastAndroid.show('Đã bỏ thích bài hát', ToastAndroid.SHORT);
    }
  };
  const likeSongs = () => {
    if (isLogin) {
      let body = {
        id_song: song.id,
        id_user: profile?.AccountID,
        title: song.title,
        genre: song.genre,
        artwork: song.artwork,
        artist: song.artist,
        url: song.url,
      };
      store.dispatch(postLiked(body, showLiked));
    } else {
      RootNavigation.navigate('Login');
    }
  };
  const dislikeSong = () => {
    function findSong(item: ILiked) {
      return item.id_song === song.id && item.id_user === profile?.AccountID;
    }
    let likeItem = dataLiked.find(findSong);
    // console.log(likeItem);
    store.dispatch(delLikeSong(likeItem.id, showDisliked));
  };
  return (
    <Ionicons
      onPress={
        dataLiked.find((item: ILiked) => {
          return (
            item.id_song === song.id && profile?.AccountID === item.id_user
          );
        })
          ? dislikeSong
          : likeSongs
      }
      name={
        dataLiked.find((item: ILiked) => {
          return (
            item.id_song === song.id && profile?.AccountID === item.id_user
          );
        })
          ? 'heart'
          : 'heart-outline'
      }
      size={28}
      color={
        dataLiked.find((item: ILiked) => {
          return (
            item.id_song === song.id && profile?.AccountID === item.id_user
          );
        })
          ? '#e24444'
          : '#555555'
      }
    />
  );
};
export default HeartComponent;
