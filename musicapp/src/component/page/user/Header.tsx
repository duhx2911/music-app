import {Avatar} from '@rneui/themed';
import {StyleSheet, Pressable, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HeaderUser = ({userProps}: any) => {
  return (
    <View style={styles.header}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          width: '100%',
          columnGap: 20,
        }}>
        <Pressable>
          <Ionicons name="notifications" size={24} color={'white'} />
        </Pressable>
        <Pressable>
          <Ionicons name="settings-sharp" size={24} color={'white'} />
        </Pressable>
      </View>
      <Avatar
        source={
          userProps.isLogin && userProps.profile
            ? {
                uri: userProps.profile.AvatarImageName,
              }
            : {
                uri: 'https://duhxmp3.000webhostapp.com/images/avatar/user-profile.jpg',
              }
        }
        avatarStyle={{borderColor: 'white', borderWidth: 2}}
        size={84}
        rounded
      />
      {userProps.isLogin && userProps.profile ? (
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: '500',
            marginTop: 10,
          }}>
          {userProps.profile.FullName}
        </Text>
      ) : (
        <View style={styles.loginWrap}>
          <Pressable style={styles.loginBtn} onPress={userProps.openLogin}>
            <Text style={{color: '#0063EC', fontWeight: '500'}}>Đăng nhập</Text>
          </Pressable>
          <Pressable style={styles.signupBtn} onPress={userProps.openSignup}>
            <Text style={{color: '#fff', fontWeight: '500'}}>Đăng ký</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0063EC',
    alignItems: 'center',
    padding: 10,
  },
  loginWrap: {
    flexDirection: 'row',
    columnGap: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  loginBtn: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  signupBtn: {
    borderColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
export default HeaderUser;
