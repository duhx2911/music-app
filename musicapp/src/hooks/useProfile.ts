import {useEffect, useState} from 'react';
import {getAPI} from '../api';
interface user {
  AccountID: number;
  Address: string;
  AvatarImageName: string;
  CreateDate: string;
  Email: string;
  FullName: string;
  Mobile: string;
  Password: string;
  RefreshToken: string;
  Status: number;
  Username: string;
  sex: string;
  bio: string;
  birthday: string;
}
const useProfile = (isLogin: boolean) => {
  const [user, setUser] = useState<user>();
  useEffect(() => {
    (async () => {
      try {
        if (isLogin) {
          let res = await getAPI({
            path: '/profile',
          });
          // console.log(res);
          // console.log('Data 1: ', res);
          if (res.data.AccountID === 200) {
            let data = res && res.data ? res.data : [];
            setUser(data);
          } else {
            let resNew = await await getAPI({
              path: '/profile',
            });
            let data = resNew && resNew.data ? resNew.data : [];
            setUser(data);
          }
        }
      } catch (error) {
        console.log('catch check: ', error);
      }
    })();
  }, [isLogin]);
  return user;
};
export default useProfile;
