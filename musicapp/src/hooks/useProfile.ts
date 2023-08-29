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
}
const useProfile = (isLogin: boolean) => {
  const [user, setUser] = useState<user>();
  useEffect(() => {
    (async () => {
      if (isLogin) {
        let res = await getAPI({
          path: '/profile',
        });
        let data = res && res.data ? res.data : [];
        setUser(data);
      }
    })();
  }, [isLogin]);
  return user;
};
export default useProfile;
