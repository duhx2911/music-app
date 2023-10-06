import {useContext} from 'react';
import {Text, Pressable} from 'react-native';
import {View} from 'react-native';
import {StyleSheet, Image} from 'react-native';
import {AuthContext} from '../../../context';
import useProfile from '../../../hooks/useProfile';

const HeaderComponent = (handleDrawer: any) => {
  const openDrawer = handleDrawer.handleDrawer;
  const {isLogin} = useContext(AuthContext);
  const profile = useProfile(isLogin);
  // console.log(isLogin);

  return (
    <View style={styles.header}>
      <Text style={{color: '#000', fontSize: 20, fontWeight: '500'}}>
        {isLogin ? 'Hi, ' + profile?.FullName : 'Hi'}
      </Text>

      <Pressable onPress={openDrawer}>
        <Image
          source={
            isLogin && profile
              ? {uri: profile.AvatarImageName}
              : {
                  uri: 'https://duhxmp3.000webhostapp.com/images/avatar/user-profile.jpg',
                }
          }
          style={styles.avatar}
        />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderColor: '#2871ef',
    borderWidth: 2,
  },
});
export default HeaderComponent;
