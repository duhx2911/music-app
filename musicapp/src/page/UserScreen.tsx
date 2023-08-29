import {Alert, Pressable, ScrollView, Text} from 'react-native';
import HeaderUser from '../component/page/user/Header';
import ContentUser from './../component/page/user/Content';
import {useContext} from 'react';
import {AuthContext} from '../context';
import useProfile from '../hooks/useProfile';

const UserScreen = ({navigation}: any) => {
  const openLogin = () => {
    navigation.navigate('Login');
  };
  const openSignup = () => {
    navigation.navigate('Signup');
  };
  const {isLogin, logout} = useContext(AuthContext);
  const profile = useProfile(isLogin);
  return (
    <ScrollView>
      <HeaderUser userProps={{openLogin, openSignup, isLogin, profile}} />
      <ContentUser />
      {isLogin ? (
        <Pressable
          style={{
            marginTop: 10,
            backgroundColor: '#fff',
            alignItems: 'center',
            paddingVertical: 10,
            width: '100%',
          }}
          onPress={() => {
            Alert.alert('Đăng xuất', 'Bạn chắc chắn muốn đăng xuất?', [
              {
                text: 'Có',
                onPress: () => {
                  logout();
                  navigation.navigate('Home');
                },
              },
              {text: 'Không'},
            ]);
          }}>
          <Text>Đăng xuất</Text>
        </Pressable>
      ) : null}
    </ScrollView>
  );
};
export default UserScreen;
