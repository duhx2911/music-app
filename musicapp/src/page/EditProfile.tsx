import {Avatar} from '@rneui/themed';
import {useContext, useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {AuthContext} from '../context';
import useProfile from '../hooks/useProfile';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {putAPIAccount} from '../api';
enum ATTRIBUTE {
  FULLNAME,
  BIO,
}

const EditProfileScreen = ({route, navigation}: any) => {
  // const {fullname} = route.params;
  const {isLogin} = useContext(AuthContext);
  const profile = useProfile(isLogin);
  const [newAvatar, setNewAvatar] = useState({
    uri: '',
    filename: '',
  });
  const [dataUpdate, setDataUpdate] = useState<any>(null);
  console.log('Dataupdate: ', route.params);
  console.log('Dataupdate: ', dataUpdate);

  const imagePicker = async () => {
    let options = {
      title: 'Chọn ảnh',
      storageOptions: {
        skipBackup: true,
        path: 'image',
      },
    };
    const result = await launchImageLibrary(options);
    // console.log(result);
    if (result.didCancel) {
      console.log('didCancel', result.didCancel);
    } else if (result.assets) {
      setNewAvatar({
        uri: result.assets[0].uri || '',
        filename: result.assets[0].fileName || '',
      });
      setDataUpdate({...dataUpdate, AvatarImageName: result.assets[0].uri});
    }
  };

  const UploadImage = async () => {
    if (newAvatar && newAvatar.filename.length && newAvatar.uri.length) {
      const reference = storage().ref(`images/${newAvatar.filename}`);
      await reference.putFile(newAvatar.uri);
      const url = await storage()
        .ref(`images/${newAvatar.filename}`)
        .getDownloadURL();
      // console.log(url);
      const updateProfile = await putAPIAccount({
        ...dataUpdate,
        AccountID: profile?.AccountID,
        AvatarImageName: url,
      });
      // console.log(updateProfile);

      if (updateProfile.data.status === 'success') {
        ToastAndroid.show('Đã lưu thay đổi', ToastAndroid.SHORT);
      }
    } else {
      const updateProfile = await putAPIAccount({
        ...dataUpdate,
        AccountID: profile?.AccountID,
      });
      // console.log(updateProfile);

      if (updateProfile.data.status === 'success') {
        ToastAndroid.show('Đã lưu thay đổi', ToastAndroid.SHORT);
      }
    }
  };
  useEffect(() => {
    if (route.params) {
      if (route.params.state === ATTRIBUTE.FULLNAME) {
        setDataUpdate({...dataUpdate, FullName: route.params.value});
      } else if (route.params.state === ATTRIBUTE.BIO) {
        setDataUpdate({...dataUpdate, bio: route.params.value});
      }
    }
  }, [route.params]);
  // console.log(route.params.fullname);
  return (
    <ScrollView>
      <View>
        <View style={styles.header}>
          <Avatar
            source={
              newAvatar && newAvatar.uri.length
                ? {
                    uri: newAvatar.uri,
                  }
                : isLogin && profile
                ? {
                    uri: profile.AvatarImageName,
                  }
                : {
                    uri: 'https://duhxmp3.000webhostapp.com/images/avatar/user-profile.jpg',
                  }
            }
            avatarStyle={{borderColor: 'white', borderWidth: 2}}
            size={84}
            rounded
          />
          <Pressable onPress={imagePicker} style={styles.editImgBtn}>
            <Text>Sửa</Text>
          </Pressable>
        </View>

        <View style={{backgroundColor: '#fff'}}>
          <Pressable
            style={styles.attrItem}
            onPress={() =>
              navigation.navigate('EditProfileForm', {
                title: 'Sửa tên',
                value:
                  dataUpdate && dataUpdate.FullName
                    ? dataUpdate.FullName
                    : profile?.FullName,
                state: ATTRIBUTE.FULLNAME,
                previousRoute: route.name,
              })
            }>
            <Text style={styles.attrTitle}>Tên</Text>
            <View style={styles.attrCont}>
              <Text numberOfLines={1} style={styles.attrText}>
                {dataUpdate && dataUpdate.FullName
                  ? dataUpdate.FullName
                  : profile
                  ? profile?.FullName
                  : ''}
              </Text>
              <EvilIcons name="chevron-right" size={30} color={'#000'} />
            </View>
          </Pressable>
          <Pressable
            style={styles.attrItem}
            onPress={() =>
              navigation.navigate('EditProfileForm', {
                title: 'Sửa bio',
                value:
                  dataUpdate && dataUpdate.bio ? dataUpdate.bio : profile?.bio,
                state: ATTRIBUTE.BIO,
                previousRoute: route.name,
              })
            }>
            <Text style={styles.attrTitle}>Bio</Text>
            <View style={styles.attrCont}>
              <Text numberOfLines={1} style={styles.attrText}>
                {dataUpdate && dataUpdate.bio
                  ? dataUpdate.bio
                  : profile && profile?.bio
                  ? profile?.bio
                  : 'Thiết lập ngay'}
              </Text>

              <EvilIcons name="chevron-right" size={30} color={'#000'} />
            </View>
          </Pressable>
        </View>
        <View style={{backgroundColor: '#fff', marginTop: 20}}>
          <Pressable style={styles.attrItem}>
            <Text style={styles.attrTitle}>Giới tính</Text>
            <Pressable style={styles.attrCont}>
              {profile?.sex && profile.sex.length ? (
                <Text numberOfLines={1} style={styles.attrText}>
                  {profile.sex}
                </Text>
              ) : (
                <Text numberOfLines={1} style={{color: '#898989'}}>
                  Thiết lập ngay
                </Text>
              )}
              <EvilIcons name="chevron-right" size={30} color={'#000'} />
            </Pressable>
          </Pressable>
          <Pressable style={styles.attrItem}>
            <Text style={styles.attrTitle}>Ngày sinh</Text>
            <Pressable style={styles.attrCont}>
              {profile?.birthday && profile.birthday.length ? (
                <Text numberOfLines={1} style={styles.attrText}>
                  {profile.birthday}
                </Text>
              ) : (
                <Text numberOfLines={1} style={{color: '#898989'}}>
                  Thiết lập ngay
                </Text>
              )}
              <EvilIcons name="chevron-right" size={30} color={'#000'} />
            </Pressable>
          </Pressable>
          <Pressable style={styles.attrItem}>
            <Text style={styles.attrTitle}>Điện thoại</Text>
            <Pressable style={styles.attrCont}>
              <Text numberOfLines={1} style={styles.attrText}>
                ********32
              </Text>
              <EvilIcons name="chevron-right" size={30} color={'#000'} />
            </Pressable>
          </Pressable>
          <Pressable style={styles.attrItem}>
            <Text style={styles.attrTitle}>Email</Text>
            <Pressable style={styles.attrCont}>
              <Text numberOfLines={1} style={styles.attrText}>
                n*****1@gmail.com
              </Text>
              <EvilIcons name="chevron-right" size={30} color={'#000'} />
            </Pressable>
          </Pressable>
        </View>

        <Pressable
          onPress={dataUpdate ? UploadImage : null}
          style={{
            backgroundColor: dataUpdate ? '#0063ec' : '#c3c3c3',
            marginTop: 20,
            paddingVertical: 10,
            alignContent: 'center',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: dataUpdate ? '#fff' : '#424242',
              fontSize: 16,
              fontWeight: '600',
            }}>
            Lưu
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  attrItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  attrTitle: {
    fontSize: 16,
    color: '#000',
  },
  attrText: {fontSize: 14, color: '#000'},
  header: {
    backgroundColor: '#0063EC',
    alignItems: 'center',
    height: 200,
    justifyContent: 'center',
    padding: 10,
  },
  attrCont: {
    flexDirection: 'row',
    width: 130,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  editImgBtn: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 8,
  },
});
export default EditProfileScreen;
