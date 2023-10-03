import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useEffect} from 'react';
import {ACCESS_TOKEN, REFRESH_TOKEN, USER_INFO} from '../constants';
import {postAPI} from '../api';
import TrackPlayer from 'react-native-track-player';
import {useSelector} from 'react-redux';
import store from '../stores';
import {getListLiked, getListSong} from '../stores/action/actionReducer';
interface AuthContextInterface {
  isLoading: boolean;
  isLogin: boolean;
  accessToken: string;
  currentTrack: any;
  currentIndex: number;
  modalVisible: boolean;
  searchVal: any;
  setSearchVal: any;
  setCurrentIndex: any;
  setModalVisible: any;
  setCurrentTrack: any;
  login: any;
  logout: any;
  signup: any;
  setupPlayer: any;
  dataMusic: any;
  dataLiked: any;
}
export const AuthContext = createContext<AuthContextInterface>({});
const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [isLoading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [isLogin, setLogin] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchVal, setSearchVal] = useState(null);
  const dataMusic: any = useSelector<any>(state => state.MusicReducer.songs);
  const dataLiked: any = useSelector<any>(state => state.LikedReducer.likeds);
  const fetchData = async () => {
    store.dispatch(getListLiked());
    store.dispatch(getListSong());
  };
  useEffect(() => {
    if (isLogin) {
      fetchData();
    }
  }, [isLogin]);

  // SIGN UP
  const signup = async (
    fullname: string,
    email: string,
    username: string,
    password: string,
  ) => {
    const postData = await postAPI({
      path: '/auth/register',
      body: {
        email: email,
        password: password,
        username: username,
        fullname: fullname,
      },
    });
    return postData;
  };
  // LOGIN
  const login = async (username: string, password: string) => {
    const postData = await postAPI({
      path: '/auth/login',
      body: {
        username: username,
        password: password,
      },
    });

    if (postData.status === 200) {
      if (postData.data.msg === 'Đăng nhập thành công.') {
        const accessToken = postData.data.accessToken;
        const refreshToken = postData.data.refreshToken;
        const userInfo = postData.data.user;
        AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
        AsyncStorage.setItem(REFRESH_TOKEN, refreshToken);
        AsyncStorage.setItem(USER_INFO, JSON.stringify(userInfo));
        setAccessToken(accessToken);
        setLogin(true);
      }
    }
    return postData;
  };

  //   Logout
  const logout = () => {
    setLoading(true);
    setAccessToken('');
    AsyncStorage.removeItem(ACCESS_TOKEN);
    AsyncStorage.removeItem(REFRESH_TOKEN);
    AsyncStorage.removeItem(USER_INFO);
    setLogin(false);
    setLoading(false);
  };

  // Setup Player
  const setupPlayer = async (dataMusic: any) => {
    try {
      await TrackPlayer.setupPlayer();
      if ((await TrackPlayer.getQueue()).length) {
        await TrackPlayer.reset();
      }
      // console.log('Check Player: run try');

      await TrackPlayer.add(dataMusic);
    } catch (error) {
      if ((await TrackPlayer.getQueue()).length) {
        await TrackPlayer.reset();
      }
      // console.log('Check Player: run catch');
      await TrackPlayer.add(dataMusic);
    }
  };

  //   Check login
  const isLoggedIn = async () => {
    try {
      setLoading(true);
      let userToken = (await AsyncStorage.getItem(ACCESS_TOKEN)) || '';
      if (userToken && userToken.length) {
        setLogin(true);
      }

      setLoading(false);
    } catch (e) {
      setLogin(false);

      console.log('Error: ', e);
    }
  };
  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        logout,
        setCurrentTrack,
        setModalVisible,
        setCurrentIndex,
        setSearchVal,
        setupPlayer,
        searchVal,
        currentIndex,
        modalVisible,
        isLoading,
        accessToken,
        isLogin,
        currentTrack,
        dataMusic,
        dataLiked,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
