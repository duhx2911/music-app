import axios from 'axios';
import {ACCESS_TOKEN, ENV_BE, REFRESH_TOKEN} from '../constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
// console.log(getToken);

axios.defaults.headers.common.Authorization = 'token';
axios.defaults.baseURL = ENV_BE;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const getAPI = async ({
  path,
  params,
}: {
  path: string;
  params?: string;
  query?: string;
}) => {
  const getToken = await AsyncStorage.getItem(ACCESS_TOKEN);
  // console.log('get token: ', getToken);

  try {
    const response = await axios.get(`${path}`, {
      params,
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    });
    return response;
  } catch (error: any) {
    console.log('error', error);

    // check token expired - kiem tra token het han => refresh lai acccess new.
    if (error && error.response && error.response.status === 401) {
      if (AsyncStorage.getItem(REFRESH_TOKEN) !== null) {
        const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);
        const refreshTokenResponse = await postAPI({
          path: 'auth/refresh-token',
          body: {
            refreshToken,
          },
        });
        // console.log('get refresh: ', refreshTokenResponse);
        AsyncStorage.setItem(
          ACCESS_TOKEN,
          refreshTokenResponse.data.accessToken,
        );
        return refreshTokenResponse;
      }
    }
    return error;
  }
};
// POST
export const postAPI = async ({path, body}: {path: string; body: any}) => {
  const getToken = await AsyncStorage.getItem(ACCESS_TOKEN);
  return axios.post(path, body, {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  });
};

export const putAPI = (body: any) => {
  return axios.put(`http://10.0.2.2:8080/products/${body.id}`, body);
  // .then((response) => {
  //   return response.status;
  // });
};

// DELETE

export const deleteAPI = (body: any) => {
  return axios.delete(`http://10.0.2.2:8080/products/${body.id}`);
};
