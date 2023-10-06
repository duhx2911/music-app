import {Alert, Pressable, ScrollView, Text, SafeAreaView} from 'react-native';
import HeaderUser from '../component/page/user/Header';
import ContentUser from './../component/page/user/Content';
import {useContext} from 'react';
import {AuthContext} from '../context';
import useProfile from '../hooks/useProfile';
import BottomModalComponent from '../component/page/player/BottomModal';

const UserScreen = ({navigation}: any) => {
  const openLogin = () => {
    navigation.navigate('Login');
  };
  const openSignup = () => {
    navigation.navigate('Signup');
  };
  const openProfile = () => {
    if (isLogin) {
      navigation.navigate('EditProfile');
    } else {
      navigation.navigate('Login');
    }
  };
  const {isLogin, logout, currentTrack} = useContext(AuthContext);
  const profile = useProfile(isLogin);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <HeaderUser userProps={{openLogin, openSignup, isLogin, profile}} />
        <ContentUser userProps={{openProfile}} />
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
      {currentTrack && <BottomModalComponent />}
    </SafeAreaView>
  );
};
export default UserScreen;
