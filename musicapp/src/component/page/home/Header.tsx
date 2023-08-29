import {Avatar} from '@rneui/themed';
import {useContext} from 'react';
import {Text} from 'react-native';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
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
        {isLogin ? 'Hi, Xuan Duc' : 'Hi'}
      </Text>

      <Avatar
        source={
          isLogin && profile
            ? {uri: profile.AvatarImageName}
            : {
                uri: 'https://duhxmp3.000webhostapp.com/images/avatar/user-profile.jpg',
              }
        }
        size={36}
        rounded
        onPress={openDrawer}
        avatarStyle={{borderColor: '#2871ef', borderWidth: 2}}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default HeaderComponent;
