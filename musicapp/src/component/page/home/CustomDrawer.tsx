import React, {useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {Alert} from 'react-native';
import {AuthContext} from '../../../context';
import useProfile from '../../../hooks/useProfile';

const CustomDrawer = (props: any) => {
  const {isLogin, logout} = useContext(AuthContext);
  const profile = useProfile(isLogin);
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#8200d6'}}>
        {isLogin && profile ? (
          <ImageBackground
            source={{
              uri: 'https://duhxmp3.000webhostapp.com/images/avatar/bg-drawer.png',
            }}
            style={{padding: 20}}>
            <Image
              source={
                {
                  uri: profile.AvatarImageName,
                }
                //   profile?.AvatarImageName && profile.AvatarImageName.length
                //     ? {uri: profile.AvatarImageName}
                //     : {
                //         uri: 'https://duhxmp3.000webhostapp.com/images/avatar/user-profile.jpg',
                //       }
              }
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                marginBottom: 10,
                borderColor: '#fff',
                borderWidth: 2,
              }}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontFamily: 'Roboto-Medium',
                marginBottom: 5,
              }}>
              {profile.FullName}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Roboto-Regular',
                  marginRight: 5,
                }}>
                {profile.Username}
              </Text>
            </View>
          </ImageBackground>
        ) : null}

        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Chia sẻ
            </Text>
          </View>
        </TouchableOpacity>
        {isLogin ? (
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Đăng xuất', 'Bạn chắc chắn muốn đăng xuất?', [
                {
                  text: 'Có',
                  onPress: () => {
                    logout();
                    props.navigation.closeDrawer();
                  },
                },
                {text: 'Không'},
              ]);
            }}
            style={{paddingVertical: 15}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="exit-outline" size={22} />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                }}>
                Đăng xuất
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{paddingVertical: 15}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="enter-outline" size={22} />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                }}>
                Đăng nhập
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default CustomDrawer;
