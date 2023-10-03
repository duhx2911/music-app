import {useContext, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';
import {AuthContext} from '../context';

const LoginScreen = ({navigation}: any) => {
  const {login} = useContext(AuthContext);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const showToast = (mess: string) => {
    ToastAndroid.show(mess, ToastAndroid.SHORT);
  };
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <View style={styles.container}>
        <View>
          <Image
            source={require('../assets/images/logoapp.png')}
            style={{width: 150, height: 150}}
          />
        </View>
        <View style={{width: '100%', rowGap: 20}}>
          <TextInput
            style={styles.input}
            placeholder="Tên tài khoản, VD: duhx2911"
            placeholderTextColor="#8391A1"
            onChangeText={value => setUserName(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu, VD: duc123"
            placeholderTextColor="#8391A1"
            autoCapitalize="none"
            secureTextEntry={true}
            blurOnSubmit={false}
            returnKeyType="next"
            underlineColorAndroid="#f000"
            enablesReturnKeyAutomatically
            onChangeText={value => setPassword(value)}
          />
          <Text
            style={{
              textAlign: 'right',
              color: '#6A707C',
              fontWeight: '500',
              fontSize: 16,
            }}>
            Quên mật khẩu?
          </Text>
        </View>

        <Pressable
          style={styles.loginBtn}
          onPress={async () => {
            if (username === '') {
              showToast('Hãy điền tên đăng nhập hoặc email!');
            } else if (password === '') {
              showToast('Hãy điền mật khẩu!');
            } else {
              const checkLogin = await login(username, password);
              // console.log(checkLogin);

              if (checkLogin.status === 200) {
                if (checkLogin.data.msg === 'Đăng nhập thành công.') {
                  showToast('Đăng nhập thành công');
                  navigation.navigate('Home');
                }
              }
            }
          }}>
          <Text style={{color: '#f7f7f7', fontSize: 20, fontWeight: '500'}}>
            Đăng nhập
          </Text>
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 5,
            marginTop: 30,
          }}>
          <View
            style={{height: 1, backgroundColor: '#E8ECF4', width: 70}}></View>
          <Text>Hoặc</Text>
          <View
            style={{height: 1, backgroundColor: '#E8ECF4', width: 70}}></View>
        </View>
        <View style={styles.loginWith}>
          <Pressable style={styles.loginWithItem}>
            <Image source={require('../assets/images/facebook_ic.png')} />
          </Pressable>
          <Pressable style={styles.loginWithItem}>
            <Image source={require('../assets/images/google_ic.png')} />
          </Pressable>
          <Pressable style={styles.loginWithItem}>
            <Image source={require('../assets/images/cib_apple.png')} />
          </Pressable>
        </View>
        <View style={{position: 'relative', top: 30}}>
          <Text style={{fontSize: 16}}>
            Bạn chưa có tài khoản?{' '}
            <Text
              style={{color: '#0063EC'}}
              onPress={() => navigation.navigate('Signup')}>
              Đăng ký ngay
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    borderColor: '#E8ECF4',
    borderWidth: 1,
    backgroundColor: '#F7F8F9',
    borderRadius: 8,
    paddingLeft: 20,
    color: '#000',
  },
  loginBtn: {
    width: '100%',
    backgroundColor: '#0063EC',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 30,
  },
  loginWith: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
  },
  loginWithItem: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderColor: '#E8ECF4',
    borderWidth: 1,
    borderRadius: 8,
  },
});
export default LoginScreen;
