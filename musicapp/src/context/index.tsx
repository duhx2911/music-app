import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useEffect} from 'react';
import {ACCESS_TOKEN, REFRESH_TOKEN, USER_INFO} from '../constants';
import {postAPI} from '../api';
import {ToastAndroid} from 'react-native';

interface AuthContextInterface {
  isLoading: boolean;
  isLogin: boolean;
  accessToken: string;
  currentTrack: any;
  currentIndex: number;
  modalVisible: boolean;
  setCurrentIndex: any;
  setModalVisible: any;
  setCurrentTrack: any;
  login: any;
  logout: any;
  signup: any;
}
export const AuthContext = createContext<AuthContextInterface>({});
const showToast = (mess: string) => {
  ToastAndroid.show(mess, ToastAndroid.SHORT);
};
const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [isLoading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [isLogin, setLogin] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // SIGN UP
  const signup = async (
    fullname: string,
    email: string,
    username: string,
    password: string,
  ) => {
    let signuped = false;
    if (fullname === '') {
      showToast('Hãy điền tên của bạn!');
    } else if (email === '') {
      showToast('Hãy điền email!');
    } else if (username === '') {
      showToast('Hãy điền tên người dùng!');
    } else if (password === '') {
      showToast('Hãy điền mật khẩu!');
    } else {
      const postData = await postAPI({
        path: '/auth/register',
        body: {
          email: email,
          password: password,
          username: username,
          fullname: fullname,
        },
      });
      if (postData.status === 200) {
        if (postData.data.status === 'success') {
          signuped = true;
        }
      }
    }

    return signuped;
  };
  // LOGIN
  const login = async (username: string, password: string) => {
    let logined = false;
    if (username === '') {
      showToast('Hãy điền tên đăng nhập hoặc email!');
    } else if (password === '') {
      showToast('Hãy điền mật khẩu!');
    } else {
      const postData = await postAPI({
        path: '/auth/login',
        body: {
          username: username,
          password: password,
        },
      });
      if (postData.status === 200) {
        if (postData.data.msg === 'Đăng nhập thành công.') {
          // openNotification("top", "error", "Đăng ký thành công");
          // console.log("PostData", postData);
          const accessToken = postData.data.accessToken;
          const refreshToken = postData.data.refreshToken;
          const userInfo = postData.data.user;
          AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
          AsyncStorage.setItem(REFRESH_TOKEN, refreshToken);
          AsyncStorage.setItem(USER_INFO, JSON.stringify(userInfo));
          setAccessToken(accessToken);
          setLogin(true);
          logined = true;
        }
      }
    }
    return logined;
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

        currentIndex,
        modalVisible,
        isLoading,
        accessToken,
        isLogin,
        currentTrack,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
